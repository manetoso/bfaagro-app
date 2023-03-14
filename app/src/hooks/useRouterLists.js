import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores'

import {
  createProductionRoutes,
  createPurchasesRoutes,
  createSalesRoutes,
  createUsersRoutes
} from '@/routes/routeslists'

export const useRouterLists = () => {
  const location = useLocation()
  const { isAuthenticated, permissions, roles } = useAuthStore()

  const purchasesRoutes = createPurchasesRoutes({ permissions, roles })
  const salesRoutes = createSalesRoutes({ permissions, roles })
  const productionRoutes = createProductionRoutes({ permissions, roles })
  const usersRoutes = createUsersRoutes({ permissions, roles })

  return {
    isAuthenticated,
    permissions,
    roles,
    location,
    purchasesRoutes,
    salesRoutes,
    productionRoutes,
    usersRoutes
  }
}
