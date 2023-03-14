import { Sales } from '@/pages'
import { ProtectedRoute } from '@/components/layout'

export const createSalesRoutes = ({ permissions, roles }) => {
  return [
    {
      path: 'ventas',
      element: (
        <ProtectedRoute
          isAllow={permissions.includes('write') && roles.includes('admin')}
        >
          <Sales />
        </ProtectedRoute>
      )
    }
  ]
}
