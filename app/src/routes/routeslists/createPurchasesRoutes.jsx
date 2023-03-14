import { Purchases } from '@/pages'
import { ProtectedRoute } from '@/components/layout'

export const createPurchasesRoutes = ({ permissions, roles }) => {
  return [
    {
      path: 'compras',
      element: (
        <ProtectedRoute
          isAllow={permissions.includes('write') && roles.includes('admin')}
        >
          <Purchases />
        </ProtectedRoute>
      )
    }
  ]
}
