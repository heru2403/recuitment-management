<template>
  <div class="test-instructions">
    <div class="instructions-container">
      <h2>Test Instructions</h2>
      <h3>{{ test.title }}</h3>
      
      <div class="instructions-content">
        <div class="section">
          <h4>Before You Begin</h4>
          <ul>
            <li>Ensure you have a stable internet connection</li>
            <li>Close all other applications and browser tabs</li>
            <li v-if="test.require_camera">Make sure your webcam is working properly</li>
            <li>Have your identification ready if required</li>
          </ul>
        </div>
        
        <div class="section">
          <h4>Test Rules</h4>
          <ul>
            <li>You will have {{ test.duration }} minutes to complete the test</li>
            <li>Do not refresh the page or navigate away during the test</li>
            <li v-if="test.require_camera">Your webcam will be active during the entire test</li>
            <li>All answers are final once submitted</li>
            <li>Cheating will result in immediate disqualification</li>
          </ul>
        </div>
        
        <div class="section">
          <h4>Technical Requirements</h4>
          <ul>
            <li>Modern web browser (Chrome, Firefox, Edge, or Safari)</li>
            <li v-if="test.require_camera">Webcam and microphone</li>
            <li>Minimum screen resolution: 1024x768</li>
            <li>JavaScript must be enabled</li>
          </ul>
        </div>
      </div>
      
      <div class="actions">
        <button @click="startTest" class="start-btn">
          Start Test
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'candidate-auth',
  layout: 'candidate',
  data() {
    return {
      test: {},
      loading: true
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const response = await $axios.get(`/api/candidate/tests/${params.testId}`);
      return { test: response.data, loading: false };
    } catch (error) {
      console.error('Error fetching test:', error);
      return { test: {}, loading: false };
    }
  },
  methods: {
    startTest() {
      this.$router.push(`/candidate/test/${this.$route.params.testId}/exam`);
    }
  }
}
</script>

<style scoped>
.test-instructions {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.instructions-container {
  background: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 700px;
  margin: 20px;
}

h2 {
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
}

h3 {
  text-align: center;
  color: #3498db;
  margin-top: 0.5rem;
}

.instructions-content {
  margin: 2rem 0;
}

.section {
  margin-bottom: 2rem;
}

.section h4 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.section ul {
  padding-left: 1.5rem;
  margin: 0;
}

.section li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.actions {
  text-align: center;
  margin-top: 2rem;
}

.start-btn {
  padding: 12px 24px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.start-btn:hover {
  background-color: #219955;
}
</style>