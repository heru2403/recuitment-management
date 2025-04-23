const routes = [
    // ... route lainnya
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/Logout.vue') // atau komponen lain
    }
  ]