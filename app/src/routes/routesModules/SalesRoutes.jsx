import { Route, Routes } from 'react-router-dom'

import { Sales } from '@/pages'

import { Clients } from '@/components/clients'
import { SaleOrders } from '@/components/saleOrders'
import { ProtectedRoute } from '@/components/layout'
import { AccountsReceivable } from '@/components/accountsReceivable'
import { Charges } from '@/components/charges'
import { PriceList } from '@/components/priceList'

import { ROLES } from '@/utils/consts'

export function SalesRoutes() {
  return (
    <Routes>
      <Route
        path='inicio'
        element={
          <ProtectedRoute allowedRoles={[ROLES.SALES]}>
            <Sales />
          </ProtectedRoute>
        }
      />
      <Route
        path='clientes'
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.SALES]}
            redirectPath='/app/ventas/inicio'
          >
            <Clients />
          </ProtectedRoute>
        }
      />
      <Route
        path='ordenes'
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.SALES]}
            redirectPath='/app/ventas/inicio'
          >
            <SaleOrders />
          </ProtectedRoute>
        }
      >
        <Route
          path='bfa'
          element={
            <ProtectedRoute
              allowedRoles={[ROLES.SALES]}
              redirectPath='/app/ventas/inicio'
            >
              <SaleOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='comisionistas'
          element={
            <ProtectedRoute
              allowedRoles={[ROLES.SALES]}
              redirectPath='/app/ventas/inicio'
            >
              <SaleOrders />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path='cuentas'
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.SALES]}
            redirectPath='/app/ventas/inicio'
          >
            <AccountsReceivable />
          </ProtectedRoute>
        }
      />
      <Route
        path='cobros'
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.SALES]}
            redirectPath='/app/ventas/inicio'
          >
            <Charges />
          </ProtectedRoute>
        }
      />
      <Route
        path='lista-precios'
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.SALES]}
            redirectPath='/app/ventas/inicio'
          >
            <PriceList />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
