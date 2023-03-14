import { Formulation, Production, Warehouses } from '@/pages'
import { ProtectedRoute } from '@/components/layout'

export const createProductionRoutes = ({ permissions, roles }) => {
  return [
    {
      path: 'produccion',
      element: (
        <ProtectedRoute
          isAllow={permissions.includes('write') && roles.includes('admin')}
        >
          <Production />
        </ProtectedRoute>
      )
    },
    {
      path: 'produccion/almacenes',
      element: (
        <ProtectedRoute
          isAllow={permissions.includes('write') && roles.includes('admin')}
          redirectPath='/app/produccion'
        >
          <Warehouses />
        </ProtectedRoute>
      )
    },
    {
      path: 'produccion/formulas',
      element: (
        <ProtectedRoute
          isAllow={permissions.includes('write') && roles.includes('admin')}
          redirectPath='/app/produccion'
        >
          <Formulation />
        </ProtectedRoute>
      )
    }
  ]
}
