import { Route, Routes } from 'react-router-dom'

import { Sales } from '@/pages'
import { Clients } from '@/components/clients'
import { SaleOrders } from '@/components/saleOrders'
import { ProtectedRoute } from '@/components/layout'

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
            <h1>Cuentas</h1>
          </ProtectedRoute>
        }
      >
        <Route
          path='tabla'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/ventas/inicio'
            >
              <h1>Cuentas</h1>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path='pagos'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
            redirectPath='/app/ventas/inicio'
          >
            <h1>Pagos</h1>
          </ProtectedRoute>
        }
      >
        <Route
          path='tabla'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/ventas/inicio'
            >
              <h1>Pagos</h1>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
