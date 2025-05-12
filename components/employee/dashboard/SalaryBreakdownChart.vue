<template>
    <div>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Salary Composition</h3>
      <div class="h-64">
        <DoughnutChart :chart-data="chartData" :options="chartOptions" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { DoughnutChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'
  
  Chart.register(...registerables)
  
  const chartData = {
    labels: ['Basic Salary', 'Allowances', 'Bonuses', 'Deductions'],
    datasets: [
      {
        data: [3200, 800, 500, 300],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#EF4444'
        ],
        borderWidth: 0
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 20
        }
      }
    }
  }
  </script>