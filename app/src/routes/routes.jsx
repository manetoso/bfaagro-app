import { Route, Routes, useLocation } from 'react-router-dom'
import { Auth, Formulation, Home, NotFound, Warehouses } from '@/pages'
import { Layout, ProtectedRoute } from '@/components/layout'
import { useAuthStore } from '@/stores'
import { AnimatePresence } from 'framer-motion'

export function Router() {
  const location = useLocation()
  const { isAuthenticated, permissions, roles } = useAuthStore()
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
            path='almacenes'
            element={
              <ProtectedRoute
                isAllow={
                  permissions.includes('write') && roles.includes('admin')
                }
              >
                <Warehouses />
              </ProtectedRoute>
            }
          />
          <Route
            path='formulas'
            element={
              <ProtectedRoute
                isAllow={
                  permissions.includes('write') && roles.includes('admin')
                }
              >
                <Formulation />
              </ProtectedRoute>
            }
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
