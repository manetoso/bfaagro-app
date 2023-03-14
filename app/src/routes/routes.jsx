import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { Auth, Home, NotFound } from '@/pages'
import { Layout, ProtectedRoute } from '@/components/layout'

import { useRouterLists } from '@/hooks/useRouterLists'

export function Router() {
  const {
    isAuthenticated,
    location,
    permissions,
    productionRoutes,
    purchasesRoutes,
    roles,
    salesRoutes,
    usersRoutes
  } = useRouterLists()
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
          {purchasesRoutes.map(({ element, path }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {salesRoutes.map(({ element, path }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {productionRoutes.map(({ element, path }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {usersRoutes.map(({ element, path }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route
          path='*'
          element={<NotFound isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </AnimatePresence>
  )
}
