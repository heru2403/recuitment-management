<template>
  <div class="employee-layout">
    <EmployeeSidebar />
    <EmployeeHeader />
    
    <main class="main-content ml-0 md:ml-64 pt-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800 flex items-center">
            <BanknotesIcon class="w-8 h-8 mr-2 text-green-600" />
            Payroll Information
          </h1>
          <div class="flex space-x-3">
            <button class="btn-outline">
              <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
              Export
            </button>
            <button class="btn-primary">
              <DocumentTextIcon class="w-5 h-5 mr-2" />
              Generate Payslip
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <PayrollStatCard 
            title="Current Salary" 
            amount="4,500.00" 
            currency="USD"
            icon="currency-dollar"
            trend="up"
            percentage="5%"
          />
          <PayrollStatCard 
            title="Last Payment" 
            amount="4,500.00" 
            currency="USD"
            icon="banknotes"
            date="15 June 2023"
          />
          <PayrollStatCard 
            title="Next Payment" 
            amount="4,500.00" 
            currency="USD"
            icon="calendar"
            date="15 July 2023"
          />
        </div>

        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4">Salary Breakdown</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SalaryBreakdownChart />
              <SalaryBreakdownTable />
            </div>
          </div>
        </div>

        <PayrollHistoryTable />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BanknotesIcon, ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'
import PayrollStatCard from '@/components/employee/dashboard/PayrollStatCard.vue'
import SalaryBreakdownChart from '@/components/employee/dashboard/SalaryBreakdownChart.vue'
import SalaryBreakdownTable from '@/components/employee/dashboard/SalaryBreakdownTable.vue'
</script>