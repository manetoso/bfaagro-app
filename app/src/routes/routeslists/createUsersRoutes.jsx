import { Users } from '@/pages'
import { ProtectedRoute } from '@/components/layout'

export const createUsersRoutes = ({ permissions, roles }) => {
  return [
    {
      path: 'usuarios',
      element: (
        <ProtectedRoute
          isAllow={permissions.includes('write') && roles.includes('admin')}
        >
          <Users />
        </ProtectedRoute>
      )
    }
  ]
}
