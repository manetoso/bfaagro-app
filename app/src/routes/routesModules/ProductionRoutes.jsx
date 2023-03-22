import { Route, Routes } from 'react-router-dom'

import { Formulation, Production, Warehouses } from '@/pages'
import { ProtectedRoute } from '@/components/layout'
import { Packaging, Products, RawMaterial } from '@/components/warehouses'

export function ProductionRoutes({ permissions, roles }) {
  return (
    <Routes>
      <Route
        path='inicio'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
          >
            <Production />
          </ProtectedRoute>
        }
      />
      <Route
        path='almacenes'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
            redirectPath='/app/produccion/inicio'
          >
            <Warehouses />
          </ProtectedRoute>
        }
      >
        <Route
          path='materia-prima'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/produccion/inicio'
            >
              <RawMaterial />
            </ProtectedRoute>
          }
        />
        <Route
          path='productos'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/produccion/inicio'
            >
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path='embalaje'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/produccion/inicio'
            >
              <Packaging />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path='formulas'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
            redirectPath='/app/produccion/inicio'
          >
            <Formulation />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
