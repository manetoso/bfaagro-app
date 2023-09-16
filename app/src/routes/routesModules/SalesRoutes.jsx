import { Route, Routes } from 'react-router-dom'

import { Sales } from '@/pages'
import { Clients } from '@/components/clients'
import { SaleOrders } from '@/components/saleOrders'
import { ProtectedRoute } from '@/components/layout'
import { AccountsReceivable } from '@/components/accountsReceivable'
import { Charges } from '@/components/charges'
import { PriceList } from '@/components/priceList'

export function SalesRoutes({ permissions, roles }) {
  return (
    <Routes>
      <Route
        path='inicio'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
          >
            <Sales />
          </ProtectedRoute>
        }
      />
      <Route
        path='clientes'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
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
            isAllow={permissions.includes('write') && roles.includes('admin')}
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
              isAllow={permissions.includes('write') && roles.includes('admin')}
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
              isAllow={permissions.includes('write') && roles.includes('admin')}
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
            isAllow={permissions.includes('write') && roles.includes('admin')}
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
            isAllow={permissions.includes('write') && roles.includes('admin')}
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
            isAllow={permissions.includes('write') && roles.includes('admin')}
            redirectPath='/app/ventas/inicio'
          >
            <PriceList />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
