export default function ({ store, redirect, route }) {
    const userRole = store.state.auth.user?.role
    const allowedRoles = route.meta.map(meta => meta.allowRoles).flat()
    
    if (!allowedRoles.includes(userRole)) {
      return redirect('/unauthorized')
    }
  }
  