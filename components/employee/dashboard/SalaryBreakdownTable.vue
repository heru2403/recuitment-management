<template>
    <div>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Detailed Breakdown</h3>
      <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Component</th>
              <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(item, index) in salaryComponents" :key="index">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {{ item.name }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-right" :class="item.type === 'deduction' ? 'text-red-600' : 'text-gray-500'">
                {{ item.amount }} USD
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-gray-900">
                Net Salary
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm font-bold text-right text-gray-900">
                {{ netSalary }} USD
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const salaryComponents = [
    { name: 'Basic Salary', amount: '3,200.00', type: 'earning' },
    { name: 'Housing Allowance', amount: '800.00', type: 'earning' },
    { name: 'Transport Allowance', amount: '200.00', type: 'earning' },
    { name: 'Performance Bonus', amount: '500.00', type: 'earning' },
    { name: 'Tax Deduction', amount: '-300.00', type: 'deduction' },
    { name: 'Health Insurance', amount: '-150.00', type: 'deduction' }
  ]
  
  const netSalary = computed(() => {
    return salaryComponents.reduce((total, item) => {
      const amount = parseFloat(item.amount.replace(',', ''))
      return item.type === 'deduction' ? total - amount : total + amount
    }, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })
  })
  </script>