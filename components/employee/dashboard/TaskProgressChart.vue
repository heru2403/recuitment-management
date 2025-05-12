<template>
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Task Progress</h3>
      <div class="h-64">
        <BarChart :chart-data="chartData" :options="chartOptions" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { BarChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'
  
  Chart.register(...registerables)
  
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [12, 19, 8, 15, 22, 18],
        backgroundColor: '#10B981'
      },
      {
        label: 'Pending Tasks',
        data: [5, 8, 12, 6, 4, 9],
        backgroundColor: '#FBBF24'
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }
  </script>