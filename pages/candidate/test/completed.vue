<template>
  <div class="test-completed">
    <div class="completion-container">
      <div class="completion-header">
        <h2>Test Completed</h2>
        <h3>{{ test.title }}</h3>
      </div>
      
      <div class="result-summary">
        <div class="result-card">
          <div class="result-title">Your Score</div>
          <div class="result-value">{{ result.score }}/{{ result.total_points }}</div>
        </div>
        
        <div class="result-card">
          <div class="result-title">Percentage</div>
          <div class="result-value">{{ percentage }}%</div>
        </div>
        
        <div class="result-card" :class="result.status === 'passed' ? 'passed' : 'failed'">
          <div class="result-title">Result</div>
          <div class="result-value">{{ result.status === 'passed' ? 'Passed' : 'Failed' }}</div>
        </div>
      </div>
      
      <div class="feedback" v-if="result.feedback">
        <h4>Feedback from Evaluator:</h4>
        <p>{{ result.feedback }}</p>
      </div>
      
      <div class="actions">
        <nuxt-link to="/candidate/dashboard" class="dashboard-btn">
          Back to Dashboard
        </nuxt-link>
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
      result: {},
      loading: true
    }
  },
  computed: {
    percentage() {
      if (this.result.total_points === 0) return 0;
      return Math.round((this.result.score / this.result.total_points) * 100);
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const testResponse = await $axios.get(`/api/candidate/tests/${params.testId}`);
      const resultResponse = await $axios.get(`/api/candidate/results/${params.testId}`);
      
      return {
        test: testResponse.data,
        result: resultResponse.data,
        loading: false
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        test: {},
        result: {},
        loading: false
      };
    }
  }
}
</script>

<style scoped>
.test-completed {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.completion-container {
  background: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px;
  margin: 20px;
}

.completion-header {
  text-align: center;
  margin-bottom: 2rem;
}

.completion-header h2 {
  margin: 0;
  color: #2c3e50;
}

.completion-header h3 {
  margin: 0.5rem 0 0;
  color: #3498db;
}

.result-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
}

.result-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.result-card.passed {
  background-color: #e8f5e9;
  border: 1px solid #a5d6a7;
}

.result-card.failed {
  background-color: #ffebee;
  border: 1px solid #ef9a9a;
}

.result-title {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.result-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.result-card.passed .result-value {
  color: #27ae60;
}

.result-card.failed .result-value {
  color: #e74c3c;
}

.feedback {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.feedback h4 {
  margin-top: 0;
  color: #2c3e50;
}

.feedback p {
  margin-bottom: 0;
  line-height: 1.6;
}

.actions {
  text-align: center;
  margin-top: 2rem;
}

.dashboard-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
}
</style>