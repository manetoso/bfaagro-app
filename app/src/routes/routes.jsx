import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { Auth, Home, Logbook, NotFound } from '@/pages'
import { Layout, ProtectedRoute } from '@/components/layout'

import {
  ProductionRoutes,
  PurchasesRoutes,
  SalesRoutes,
  UsersRoutes
} from './routesModules'
import { useRouterLists } from '@/hooks/useRouterLists'

import { ROLES } from '@/utils/consts'

export function Router() {
  const { isAuthenticated, location } = useRouterLists()
  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route
          path='/autenticacion'
          element={<Auth isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/app'
          element={<Layout isAuthenticated={isAuthenticated} />}
        >
          <Route path='inicio' element={<Home />} />
          <Route path='compras/*' element={<PurchasesRoutes />} />
          <Route path='ventas/*' element={<SalesRoutes />} />
          <Route
            path='bitacora/*'
            element={
              <ProtectedRoute allowedRoles={[ROLES.LOGBOOK]}>
                <Logbook />
              </ProtectedRoute>
            }
          />
          <Route path='produccion/*' element={<ProductionRoutes />} />
          <Route path='usuarios/*' element={<UsersRoutes />} />
        </Route>
        <Route
          path='*'
          element={<NotFound isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </AnimatePresence>
  )
}
