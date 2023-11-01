import { Route, Routes } from 'react-router-dom'

import { Purchases } from '@/pages'
import { ProtectedRoute } from '@/components/layout'

import { Suppliers } from '@/components/suppliers'
import { PurchaseOrders } from '@/components/purchaseOrders'
import { AccountsPayable } from '@/components/accountsPayable'
import { Payments } from '@/components/payments'

import { ROLES } from '@/utils/consts'

export function PurchasesRoutes() {
  return (
    <Routes>
      <Route
        path='inicio'
        element={
          <ProtectedRoute allowedRoles={[ROLES.PURCHASES]}>
            <Purchases />
          </ProtectedRoute>
        }
      />
      <Route
        path='proveedores'
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.PURCHASES]}
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
              allowedRoles={[ROLES.PURCHASES]}
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
            allowedRoles={[ROLES.PURCHASES]}
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
              allowedRoles={[ROLES.PURCHASES]}
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
            allowedRoles={[ROLES.PURCHASES]}
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
              allowedRoles={[ROLES.PURCHASES]}
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
            allowedRoles={[ROLES.PURCHASES]}
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
              allowedRoles={[ROLES.PURCHASES]}
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
