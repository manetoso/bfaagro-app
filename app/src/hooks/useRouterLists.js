import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores'
import { useEffect } from 'react'

export const useRouterLists = () => {
  const location = useLocation()
  const { isAuthenticated, roles, token, login } = useAuthStore()

  useEffect(() => {
    if (token !== '') {
      const user = JSON.parse(window.localStorage.getItem('bfa-user'))
      if (!user) return
      login({ password: user.password, username: user.username })
    }
  }, [])

  return {
    isAuthenticated,
    roles,
    token,
    location
  }
}
