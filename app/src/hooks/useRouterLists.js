import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores'

export const useRouterLists = () => {
  const location = useLocation()
  const { isAuthenticated, permissions, roles } = useAuthStore()

  return {
    isAuthenticated,
    permissions,
    roles,
    location
  }
}
