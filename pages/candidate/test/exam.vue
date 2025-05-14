<template>
  <div class="exam-container">
    <div class="exam-header">
      <div class="exam-title">{{ test.title }}</div>
      <div class="exam-timer">
        Time Remaining: {{ formattedTime }}
      </div>
    </div>
    
    <div class="exam-body">
      <div class="question-section">
        <div class="question-navigation">
          <button @click="prevQuestion" :disabled="currentIndex === 0">
            Previous
          </button>
          <div class="question-counter">
            Question {{ currentIndex + 1 }} of {{ questions.length }}
          </div>
          <button @click="nextQuestion" :disabled="currentIndex === questions.length - 1">
            Next
          </button>
        </div>
        
        <div class="question-content">
          <div class="question-text">{{ currentQuestion.text }}</div>
          
          <div v-if="currentQuestion.type === 'multiple_choice'" class="options">
            <div v-for="(option, index) in currentQuestion.options" 
                 :key="index" 
                 class="option"
                 @click="selectAnswer(index)"
                 :class="{ selected: answers[currentIndex] === index }">
              <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
              <span class="option-text">{{ option }}</span>
            </div>
          </div>
          
          <div v-else class="essay-answer">
            <textarea v-model="answers[currentIndex]" 
                      placeholder="Type your answer here..."
                      rows="8"></textarea>
          </div>
        </div>
        
        <div class="exam-actions">
          <button @click="finishExam" class="finish-btn">
            Finish Exam
          </button>
        </div>
      </div>
      
      <div class="proctoring-section" v-if="test.require_camera">
        <div class="camera-feed">
          <video ref="video" autoplay playsinline></video>
          <div v-if="!cameraActive" class="camera-off">
            Camera is off
          </div>
        </div>
        <div class="proctoring-status">
          <div class="status-item">
            <span class="status-label">Proctoring:</span>
            <span class="status-value">{{ cameraActive ? 'Active' : 'Inactive' }}</span>
          </div>
          <div class="status-item">
            <span class="status-label">Last Capture:</span>
            <span class="status-value">{{ lastCaptureTime || 'Not yet' }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Confirmation Modal -->
    <modal v-if="showConfirmationModal" @close="showConfirmationModal = false">
      <h3>Finish Exam</h3>
      <p>Are you sure you want to submit your answers? You won't be able to change them after submission.</p>
      <div class="modal-actions">
        <button @click="showConfirmationModal = false" class="cancel-btn">Cancel</button>
        <button @click="confirmFinish" class="confirm-btn">Submit Answers</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  middleware: 'candidate-auth',
  layout: 'candidate',
  data() {
    return {
      test: {},
      questions: [],
      currentIndex: 0,
      answers: [],
      timeLeft: 0,
      timer: null,
      cameraActive: false,
      videoStream: null,
      captureInterval: null,
      lastCaptureTime: null,
      showConfirmationModal: false
    }
  },
  computed: {
    formattedTime() {
      const hours = Math.floor(this.timeLeft / 3600);
      const minutes = Math.floor((this.timeLeft % 3600) / 60);
      const seconds = this.timeLeft % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    currentQuestion() {
      return this.questions[this.currentIndex];
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const response = await $axios.get(`/api/candidate/tests/${params.testId}`);
      return { 
        test: response.data.test,
        questions: response.data.questions,
        timeLeft: response.data.test.duration * 60
      };
    } catch (error) {
      console.error('Error fetching test:', error);
      return { test: {}, questions: [], timeLeft: 0 };
    }
  },
  mounted() {
    this.startTimer();
    this.initializeAnswers();
    
    if (this.test.require_camera) {
      this.startCamera();
    }
  },
  beforeDestroy() {
    this.stopTimer();
    this.stopCamera();
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          this.finishExam();
        }
      }, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    initializeAnswers() {
      this.answers = Array(this.questions.length).fill(null);
    },
    async startCamera() {
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        this.$refs.video.srcObject = this.videoStream;
        this.cameraActive = true;
        
        // Start periodic captures every 30 seconds
        this.captureInterval = setInterval(this.captureImage, 30000);
        this.captureImage(); // Initial capture
      } catch (error) {
        console.error('Error accessing camera:', error);
        this.$toast.error('Could not access camera. Please enable camera permissions to continue.');
      }
    },
    stopCamera() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop());
        this.videoStream = null;
      }
      if (this.captureInterval) {
        clearInterval(this.captureInterval);
        this.captureInterval = null;
      }
      this.cameraActive = false;
    },
    async captureImage() {
      if (!this.cameraActive) return;
      
      try {
        const canvas = document.createElement('canvas');
        const video = this.$refs.video;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.7);
        this.lastCaptureTime = new Date().toLocaleTimeString();
        
        await this.$axios.post('/api/candidate/test/capture', {
          test_id: this.test.id,
          image: imageData,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error saving capture:', error);
      }
    },
    selectAnswer(index) {
      this.$set(this.answers, this.currentIndex, index);
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      }
    },
    finishExam() {
      this.showConfirmationModal = true;
    },
    async confirmFinish() {
      this.showConfirmationModal = false;
      this.stopTimer();
      this.stopCamera();
      
      try {
        await this.$axios.post('/api/candidate/test/submit', {
          test_id: this.test.id,
          answers: this.answers
        });
        
        this.$router.push(`/candidate/test/${this.test.id}/completed`);
      } catch (error) {
        console.error('Error submitting test:', error);
        this.$toast.error('Error submitting test. Please try again.');
      }
    }
  }
}
</script>

<style scoped>
.exam-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f7fa;
}

.exam-header {
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exam-title {
  font-size: 1.2rem;
  font-weight: 500;
}

.exam-timer {
  font-size: 1.1rem;
  font-weight: bold;
  color: #f39c12;
}

.exam-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.question-section {
  flex: 1;
  padding: 20px;
  background-color: white;
  overflow-y: auto;
}

.question-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.question-navigation button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.question-navigation button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.question-counter {
  font-weight: 500;
  color: #2c3e50;
}

.question-content {
  margin-bottom: 30px;
}

.question-text {
  font-size: 1.1rem;
  margin-bottom: 20px;
  line-height: 1.5;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.option:hover {
  background-color: #f5f5f5;
}

.option.selected {
  background-color: #e3f2fd;
  border-color: #3498db;
}

.option-letter {
  font-weight: bold;
  margin-right: 10px;
  color: #3498db;
}

.essay-answer textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.exam-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.finish-btn {
  padding: 12px 24px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.proctoring-section {
  width: 300px;
  padding: 20px;
  background-color: #f8f9fa;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.camera-feed {
  width: 100%;
  height: 200px;
  background-color: #000;
  border-radius: 4px;
  position: relative;
  margin-bottom: 15px;
}

.camera-feed video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-off {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
}

.proctoring-status {
  margin-top: auto;
}

.status-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.status-label {
  color: #7f8c8d;
}

.status-value {
  font-weight: 500;
}

/* Modal styles */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>