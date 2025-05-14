<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Test Results - {{ test.title }}</h2>
      <nuxt-link :to="`/admin/cbt/${test.id}`" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Back to Test
      </nuxt-link>
    </div>

    <div class="flex flex-wrap gap-4 mb-6">
      <div class="flex items-center gap-2">
        <label class="font-semibold">Search:</label>
        <input type="text" v-model="searchQuery" placeholder="Search candidates..." class="border rounded px-3 py-1" />
      </div>

      <div class="flex items-center gap-2">
        <label class="font-semibold">Status:</label>
        <select v-model="statusFilter" class="border rounded px-3 py-1">
          <option value="all">All</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <label class="font-semibold">Sort by:</label>
        <select v-model="sortBy" class="border rounded px-3 py-1">
          <option value="score">Score</option>
          <option value="date">Date</option>
          <option value="name">Name</option>
        </select>
        <select v-model="sortDirection" class="border rounded px-3 py-1">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 text-left">Candidate</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Score</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Date Completed</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in filteredResults" :key="result.id" class="border-t">
            <td class="p-3">{{ result.candidate.full_name }}</td>
            <td class="p-3">{{ result.candidate.email }}</td>
            <td class="p-3">{{ result.score }} / {{ result.total_points }}</td>
            <td class="p-3 font-bold" :class="result.status === 'passed' ? 'text-green-600' : 'text-red-600'">
              {{ result.status === 'passed' ? 'Passed' : 'Failed' }}
            </td>
            <td class="p-3">{{ formatDate(result.completed_at) }}</td>
            <td class="p-3">
              <nuxt-link :to="`/admin/cbt/results/${result.id}`" class="text-blue-600 hover:underline">
                View Details
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="text-center py-4 text-gray-500">Loading results...</div>
    <div v-if="!loading && results.length === 0" class="text-center py-4 text-gray-500">
      No results found for this test.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute, useAsyncData } from '#app';

interface Candidate {
  full_name: string;
  email: string;
}

interface Result {
  id: number;
  candidate: Candidate;
  score: number;
  total_points: number;
  status: string;
  completed_at: string;
}

interface Test {
  id: number;
  title: string;
}

const route = useRoute();
const searchQuery = ref('');
const statusFilter = ref('all');
const sortBy = ref<'score' | 'date' | 'name'>('score');
const sortDirection = ref<'asc' | 'desc'>('desc');

const { data: testData } = await useAsyncData(`test-${route.params.id}`, () =>
  $fetch<Test>(`/api/admin/tests/${route.params.id}`)
);

const { data: resultData } = await useAsyncData(`results-${route.params.id}`, () =>
  $fetch<Result[]>(`/api/admin/tests/${route.params.id}/results`)
);

const test = ref<Test>(testData.value || { id: 0, title: '' });
const results = ref<Result[]>(resultData.value || []);
const loading = ref(false);

const filteredResults = computed(() => {
  let filtered = results.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(result =>
      result.candidate.full_name.toLowerCase().includes(query) ||
      result.candidate.email.toLowerCase().includes(query)
    );
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(result => result.status === statusFilter.value);
  }

  filtered = [...filtered].sort((a, b) => {
    let comparison = 0;
    if (sortBy.value === 'score') {
      comparison = a.score - b.score;
    } else if (sortBy.value === 'date') {
      comparison = new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime();
    } else if (sortBy.value === 'name') {
      comparison = a.candidate.full_name.localeCompare(b.candidate.full_name);
    }
    return sortDirection.value === 'desc' ? -comparison : comparison;
  });

  return filtered;
});

function formatDate(dateStr: string): string {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
</script>
