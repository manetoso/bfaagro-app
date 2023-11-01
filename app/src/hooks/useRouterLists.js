import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores'

export const useRouterLists = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, roles, token } = useAuthStore()

  useEffect(() => {
    if (token !== '') {
      navigate('/autenticacion')
    }
  }, [])

  return {
    isAuthenticated,
    roles,
    token,
    location
  }
}
