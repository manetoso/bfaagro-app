import { Route, Routes } from 'react-router-dom'

import { Purchases } from '@/pages'
import { ProtectedRoute } from '@/components/layout'

import { Suppliers } from '@/components/suppliers'
import { PurchaseOrders } from '@/components/purchaseOrders'
import { AccountsPayable } from '@/components/accountsPayable'
import { Payments } from '@/components/payments'

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
      <Route
        path='ordenes'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
            redirectPath='/app/compras/inicio'
          >
            <PurchaseOrders />
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
              <PurchaseOrders />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path='cuentas'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
            redirectPath='/app/compras/inicio'
          >
            <AccountsPayable />
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
              <AccountsPayable />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path='pagos'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
            redirectPath='/app/compras/inicio'
          >
            <Payments />
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
              <Payments />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
