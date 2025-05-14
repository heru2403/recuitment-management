<template>
  <div class="admin-tests">
    <div class="header">
      <h2>Manage Tests</h2>
      <nuxt-link to="/admin/cbt/create" class="add-btn">
        Create New Test
      </nuxt-link>
    </div>
    
    <div class="search-filter">
      <input type="text" v-model="searchQuery" placeholder="Search tests...">
      <select v-model="statusFilter">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
    
    <div class="tests-list">
      <div v-for="test in filteredTests" :key="test.id" class="test-card">
        <div class="test-info">
          <h3>{{ test.title }}</h3>
          <p>{{ test.description }}</p>
          <div class="test-meta">
            <span>Duration: {{ test.duration }} mins</span>
            <span>Questions: {{ test.question_count }}</span>
            <span :class="test.is_active ? 'active' : 'inactive'">
              {{ test.is_active ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
        <div class="test-actions">
          <nuxt-link :to="`/admin/cbt/${test.id}/edit`" class="edit-btn">Edit</nuxt-link>
          <nuxt-link :to="`/admin/cbt/${test.id}/questions`" class="questions-btn">Questions</nuxt-link>
          <nuxt-link :to="`/admin/cbt/${test.id}/results`" class="results-btn">Results</nuxt-link>
          <button @click="toggleTestStatus(test.id, test.is_active)" 
                  :class="test.is_active ? 'deactivate-btn' : 'activate-btn'">
            {{ test.is_active ? 'Deactivate' : 'Activate' }}
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="loading">Loading tests...</div>
    <div v-if="!loading && tests.length === 0" class="no-tests">
      No tests found. Create your first test.
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'admin-auth',
  data() {
    return {
      tests: [],
      loading: true,
      searchQuery: '',
      statusFilter: 'all'
    }
  },
  computed: {
    filteredTests() {
      return this.tests.filter(test => {
        const matchesSearch = test.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            test.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesStatus = this.statusFilter === 'all' || 
                            (this.statusFilter === 'active' && test.is_active) || 
                            (this.statusFilter === 'inactive' && !test.is_active);
        return matchesSearch && matchesStatus;
      });
    }
  },
  async mounted() {
    await this.fetchTests();
  },
  methods: {
    async fetchTests() {
      try {
        const response = await this.$axios.get('/api/admin/tests');
        this.tests = response.data;
      } catch (error) {
        console.error('Error fetching tests:', error);
      } finally {
        this.loading = false;
      }
    },
    async toggleTestStatus(testId, currentStatus) {
      try {
        await this.$axios.put(`/api/admin/tests/${testId}/status`, {
          is_active: !currentStatus
        });
        this.fetchTests();
      } catch (error) {
        console.error('Error toggling test status:', error);
      }
    }
  }
}
definePageMeta({
  layout: 'admin',
  title: 'Manajemen CBT',
  meta: [
    { name: 'description', content: 'Manage your CBT tests here.' },
    { name: 'keywords', content: 'CBT, tests, management' }
  ]
})

</script>

<style scoped>
.admin-tests {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
}

.search-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-filter input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-filter select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tests-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.test-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.test-info h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.test-info p {
  color: #666;
  margin-bottom: 15px;
}

.test-meta {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #666;
}

.test-meta span.active {
  color: #4CAF50;
}

.test-meta span.inactive {
  color: #f44336;
}

.test-actions {
  display: flex;
  gap: 8px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.test-actions a, .test-actions button {
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
  border: none;
}

.questions-btn {
  background-color: #673AB7;
  color: white;
  border: none;
}

.results-btn {
  background-color: #009688;
  color: white;
  border: none;
}

.activate-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.deactivate-btn {
  background-color: #f44336;
  color: white;
  border: none;
}

.loading, .no-tests {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>