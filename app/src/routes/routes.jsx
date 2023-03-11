import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth, Formulation, Home, NotFound, Warehouses } from '@/pages'
import { Layout, ProtectedRoute } from '@/components/layout'
import { useAuthStore } from '@/stores'

export function Router() {
  const { isAuthenticated, permissions, roles } = useAuthStore()
  return (
    <BrowserRouter>
      <Routes>
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
    </BrowserRouter>
  )
}
