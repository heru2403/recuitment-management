<template>
  <div class="edit-test">
    <h2>Edit Test</h2>
    
    <form @submit.prevent="updateTest">
      <div class="form-group">
        <label for="title">Test Title</label>
        <input type="text" id="title" v-model="test.title" required>
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="test.description" rows="3"></textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="duration">Duration (minutes)</label>
          <input type="number" id="duration" v-model="test.duration" min="1" required>
        </div>
        
        <div class="form-group">
          <label for="passing_score">Passing Score (%)</label>
          <input type="number" id="passing_score" v-model="test.passing_score" min="1" max="100">
        </div>
      </div>
      
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="test.require_camera"> Require camera during test
        </label>
      </div>
      
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="test.is_active"> Test is active
        </label>
      </div>
      
      <div class="form-actions">
        <nuxt-link to="/admin/cbt" class="cancel-btn">Cancel</nuxt-link>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Updating...' : 'Update Test' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'admin-auth',
  data() {
    return {
      test: {
        title: '',
        description: '',
        duration: 60,
        passing_score: 60,
        require_camera: false,
        is_active: false
      },
      loading: false
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const response = await $axios.get(`/api/admin/tests/${params.id}`);
      return { test: response.data };
    } catch (error) {
      console.error('Error fetching test:', error);
      return { test: {} };
    }
  },
  methods: {
    async updateTest() {
      this.loading = true;
      try {
        await this.$axios.put(`/api/admin/tests/${this.$route.params.id}`, this.test);
        this.$router.push('/admin/cbt');
      } catch (error) {
        console.error('Error updating test:', error);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.edit-test {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 80px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-label input {
  margin: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}

.form-actions .cancel-btn {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}

.form-actions button {
  padding: 8px 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>