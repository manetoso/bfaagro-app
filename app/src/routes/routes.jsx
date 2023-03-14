import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { Auth, Home, NotFound } from '@/pages'
import { Layout, ProtectedRoute } from '@/components/layout'

import {
  ProductionRoutes,
  PurchasesRoutes,
  SalesRoutes,
  UsersRoutes
} from './routesModules'
import { useRouterLists } from '@/hooks/useRouterLists'

export function Router() {
  const { isAuthenticated, location, permissions, roles } = useRouterLists()
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
          <Route
            path='inicio'
            element={
              <ProtectedRoute
                isAllow={
                  permissions.includes('write') && roles.includes('admin')
                }
              >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='compras/*'
            element={
              <PurchasesRoutes permissions={permissions} roles={roles} />
            }
          />
          <Route
            path='ventas/*'
            element={<SalesRoutes permissions={permissions} roles={roles} />}
          />
          <Route
            path='produccion/*'
            element={
              <ProductionRoutes permissions={permissions} roles={roles} />
            }
          />
          <Route
            path='usuarios/*'
            element={<UsersRoutes permissions={permissions} roles={roles} />}
          />
        </Route>
        <Route
          path='*'
          element={<NotFound isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </AnimatePresence>
  )
}
