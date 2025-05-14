<template>
  <div class="admin-questions">
    <div class="header">
      <h2>Manage Questions - {{ test.title }}</h2>
      <div class="actions">
        <button @click="showAddModal = true" class="add-btn">
          Add Question
        </button>
        <nuxt-link :to="`/admin/cbt/${test.id}`" class="back-btn">
          Back to Test
        </nuxt-link>
      </div>
    </div>
    
    <div class="questions-list">
      <div v-for="(question, index) in questions" :key="question.id" class="question-card">
        <div class="question-content">
          <div class="question-header">
            <h4>Q{{ index + 1 }}: {{ question.text }}</h4>
            <span class="points">{{ question.points }} point{{ question.points !== 1 ? 's' : '' }}</span>
          </div>
          <ul v-if="question.type === 'multiple_choice'">
            <li v-for="(option, optIndex) in question.options" :key="optIndex">
              {{ String.fromCharCode(65 + optIndex) }}. {{ option }}
              <span v-if="optIndex === question.correct_answer" class="correct">✓ Correct</span>
            </li>
          </ul>
          <p v-else class="essay-indicator">Essay question</p>
        </div>
        <div class="question-actions">
          <button @click="editQuestion(question)" class="edit-btn">Edit</button>
          <button @click="deleteQuestion(question.id)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="loading">Loading questions...</div>
    <div v-if="!loading && questions.length === 0" class="no-questions">
      No questions yet. Add your first question.
    </div>
    
    <!-- Add/Edit Question Modal -->
    <modal v-if="showAddModal || showEditModal" @close="closeModal">
      <h3>{{ isEditing ? 'Edit Question' : 'Add New Question' }}</h3>
      <form @submit.prevent="submitQuestion">
        <div class="form-group">
          <label>Question Type</label>
          <select v-model="currentQuestion.type" @change="handleTypeChange">
            <option value="multiple_choice">Multiple Choice</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Question Text</label>
          <textarea v-model="currentQuestion.text" required></textarea>
        </div>
        
        <div v-if="currentQuestion.type === 'multiple_choice'" class="options-section">
          <div v-for="(option, index) in currentQuestion.options" :key="index" class="option-item">
            <input type="radio" 
                   :name="'correctOption'" 
                   :value="index" 
                   v-model="currentQuestion.correct_answer">
            <input type="text" 
                   v-model="currentQuestion.options[index]" 
                   :placeholder="'Option ' + String.fromCharCode(65 + index)"
                   required>
            <button v-if="currentQuestion.options.length > 2" 
                    @click="removeOption(index)" 
                    type="button"
                    class="remove-option">
              ×
            </button>
          </div>
          <button @click="addOption" type="button" class="add-option">
            + Add Option
          </button>
        </div>
        
        <div class="form-group">
          <label>Points</label>
          <input type="number" v-model="currentQuestion.points" min="1" required>
        </div>
        
        <div class="modal-actions">
          <button type="button" @click="closeModal" class="cancel-btn">Cancel</button>
          <button type="submit" class="submit-btn">
            {{ isEditing ? 'Update' : 'Add' }} Question
          </button>
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
export default {
  middleware: 'admin-auth',
  data() {
    return {
      test: {},
      questions: [],
      loading: true,
      showAddModal: false,
      showEditModal: false,
      isEditing: false,
      currentQuestion: {
        id: null,
        text: '',
        type: 'multiple_choice',
        options: ['', '', '', ''],
        correct_answer: 0,
        points: 1
      }
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const testResponse = await $axios.get(`/api/admin/tests/${params.id}`);
      const questionsResponse = await $axios.get(`/api/admin/tests/${params.id}/questions`);
      return {
        test: testResponse.data,
        questions: questionsResponse.data,
        loading: false
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        test: {},
        questions: [],
        loading: false
      };
    }
  },
  methods: {
    handleTypeChange() {
      if (this.currentQuestion.type === 'essay') {
        this.currentQuestion.options = [];
        this.currentQuestion.correct_answer = null;
      } else {
        this.currentQuestion.options = ['', '', '', ''];
        this.currentQuestion.correct_answer = 0;
      }
    },
    addOption() {
      this.currentQuestion.options.push('');
    },
    removeOption(index) {
      this.currentQuestion.options.splice(index, 1);
      if (this.currentQuestion.correct_answer >= index) {
        this.currentQuestion.correct_answer = Math.max(0, this.currentQuestion.correct_answer - 1);
      }
    },
    editQuestion(question) {
      this.currentQuestion = JSON.parse(JSON.stringify(question));
      this.isEditing = true;
      this.showEditModal = true;
    },
    async deleteQuestion(questionId) {
      if (confirm('Are you sure you want to delete this question?')) {
        try {
          await this.$axios.delete(`/api/admin/questions/${questionId}`);
          this.questions = this.questions.filter(q => q.id !== questionId);
        } catch (error) {
          console.error('Error deleting question:', error);
        }
      }
    },
    async submitQuestion() {
      try {
        const testId = this.$route.params.id;
        const url = this.isEditing 
          ? `/api/admin/questions/${this.currentQuestion.id}`
          : `/api/admin/tests/${testId}/questions`;
        
        const method = this.isEditing ? 'put' : 'post';
        
        const response = await this.$axios[method](url, this.currentQuestion);
        
        if (this.isEditing) {
          this.questions = this.questions.map(q => 
            q.id === this.currentQuestion.id ? response.data : q
          );
        } else {
          this.questions.push(response.data);
        }
        
        this.closeModal();
      } catch (error) {
        console.error('Error saving question:', error);
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.showEditModal = false;
      this.isEditing = false;
      this.resetCurrentQuestion();
    },
    resetCurrentQuestion() {
      this.currentQuestion = {
        id: null,
        text: '',
        type: 'multiple_choice',
        options: ['', '', '', ''],
        correct_answer: 0,
        points: 1
      };
    }
  }
}
</script>

<style scoped>
.admin-questions {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  gap: 10px;
}

.add-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn {
  background-color: #2196F3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  text-decoration: none;
}

.questions-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.question-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: white;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.question-header h4 {
  margin: 0;
  flex: 1;
}

.points {
  background-color: #673AB7;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.question-content ul {
  list-style-type: none;
  padding-left: 0;
  margin: 10px 0;
}

.question-content li {
  margin-bottom: 8px;
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 4px;
  position: relative;
  padding-left: 35px;
}

.correct {
  color: #4CAF50;
  margin-left: 10px;
}

.essay-indicator {
  font-style: italic;
  color: #666;
}

.question-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 15px;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.loading, .no-questions {
  text-align: center;
  padding: 20px;
  color: #666;
}

/* Modal styles */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group select, 
.form-group textarea, 
.form-group input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 100px;
}

.options-section {
  margin-bottom: 15px;
}

.option-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.option-item input[type="radio"] {
  margin-right: 10px;
}

.option-item input[type="text"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remove-option {
  background: none;
  border: none;
  color: #f44336;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
}

.add-option {
  background: none;
  border: 1px dashed #2196F3;
  color: #2196F3;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>