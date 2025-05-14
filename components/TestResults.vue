<template>
  <div class="test-results-container">
    <!-- Header -->
    <div class="header">
      <h2 class="title">Test Results - {{ test.title }}</h2>
      <button class="back-button" @click="$router.push('/cbt')">
        Back to Tests
      </button>
    </div>
    
    <!-- Summary Cards -->
    <div class="summary-cards">
      <div class="summary-card">
        <div class="card-icon">👥</div>
        <div>
          <h3>Total Candidates</h3>
          <p>{{ summary.total_candidates }}</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="card-icon">📊</div>
        <div>
          <h3>Average Score</h3>
          <p>{{ summary.average_score }}%</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="card-icon">✅</div>
        <div>
          <h3>Pass Rate</h3>
          <p>{{ summary.pass_rate }}%</p>
        </div>
      </div>
    </div>
    
    <!-- Filters -->
    <div class="filters">
      <div class="search-filter">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search candidates..."
          class="search-input"
        >
        <span class="search-icon">🔍</span>
      </div>
      <select v-model="statusFilter" class="status-filter">
        <option value="all">All Status</option>
        <option value="passed">Passed</option>
        <option value="failed">Failed</option>
      </select>
    </div>
    
    <!-- Results Table -->
    <div class="results-table">
      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Email</th>
            <th>Score</th>
            <th>Status</th>
            <th>Date Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in filteredResults" :key="result.id">
            <td>{{ result.candidate.full_name }}</td>
            <td>{{ result.candidate.email }}</td>
            <td>{{ result.score }} / {{ result.total_points }}</td>
            <td :class="['status', result.status]">
              {{ result.status === 'passed' ? 'Passed' : 'Failed' }}
            </td>
            <td>{{ formatDate(result.completed_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Empty State -->
    <div v-if="filteredResults.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <h3>No results found</h3>
      <p>Try adjusting your search or filter criteria</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: {
        id: 1,
        title: "Programming Skill Assessment"
      },
      results: [
        {
          id: 1,
          candidate: {
            full_name: "John Doe",
            email: "john.doe@example.com"
          },
          score: 85,
          total_points: 100,
          status: "passed",
          completed_at: "2023-06-15T09:30:00Z"
        },
        {
          id: 2,
          candidate: {
            full_name: "Jane Smith",
            email: "jane.smith@example.com"
          },
          score: 72,
          total_points: 100,
          status: "passed",
          completed_at: "2023-06-16T10:15:00Z"
        },
        {
          id: 3,
          candidate: {
            full_name: "Robert Johnson",
            email: "robert.j@example.com"
          },
          score: 45,
          total_points: 100,
          status: "failed",
          completed_at: "2023-06-16T14:45:00Z"
        }
      ],
      summary: {
        total_candidates: 3,
        average_score: 67,
        pass_rate: 67
      },
      searchQuery: '',
      statusFilter: 'all'
    }
  },
  computed: {
    filteredResults() {
      let filtered = this.results
      
      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(result => 
          result.candidate.full_name.toLowerCase().includes(query) || 
          result.candidate.email.toLowerCase().includes(query)
        )
      }
      
      // Status filter
      if (this.statusFilter !== 'all') {
        filtered = filtered.filter(result => result.status === this.statusFilter)
      }
      
      return filtered
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.test-results-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  color: #2d3748;
  margin: 0;
}

.back-button {
  background-color: #4299e1;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #3182ce;
}

.summary-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

/* Add other styles here */

</style>