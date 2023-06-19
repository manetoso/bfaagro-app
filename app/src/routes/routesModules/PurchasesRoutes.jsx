import { Route, Routes } from 'react-router-dom'

import { Purchases } from '@/pages'
import { ProtectedRoute } from '@/components/layout'

import { Suppliers } from '@/components/suppliers'

export function PurchasesRoutes({ permissions, roles }) {
  return (
    <Routes>
      <Route
        path='inicio'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
          >
            <Purchases />
          </ProtectedRoute>
        }
      />
      <Route
        path='proveedores'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
            redirectPath='/app/compras/inicio'
          >
            <Suppliers />
          </ProtectedRoute>
        }
      >
        <Route
          path='tabla'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/compras/inicio'
            >
              <Suppliers />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
