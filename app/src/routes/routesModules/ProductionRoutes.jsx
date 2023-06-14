import { Route, Routes } from 'react-router-dom'

import { Formulation, Processes, Production, Warehouses } from '@/pages'
import { ProtectedRoute } from '@/components/layout'
import { FinishedProducts, Packaging, Products, RawMaterial } from '@/components/warehouses'

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
        <Route
          path='prod-terminados'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/produccion/inicio'
            >
              <FinishedProducts />
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
      >
        <Route
          path='productos'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/produccion/inicio'
            >
              <Formulation />
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
              <Formulation />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path='procesos'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
            redirectPath='/app/produccion/inicio'
          >
            <Processes />
          </ProtectedRoute>
        }
      >
        <Route
          path='tabla'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/produccion/inicio'
            >
              <Processes />
            </ProtectedRoute>
          }
        />
        <Route
          path='porHacer'
          element={
            <ProtectedRoute
              isAllow={permissions.includes('write') && roles.includes('admin')}
              redirectPath='/app/produccion/inicio'
            >
              <Processes />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
