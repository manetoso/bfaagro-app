import { Route, Routes } from 'react-router-dom'

import {
  Formulation,
  Processes,
  ProcessesKanvas,
  Production,
  Warehouses
} from '@/pages'
import { ProtectedRoute } from '@/components/layout'
import {
  FinishedProducts,
  Packaging,
  Products,
  RawMaterial,
  Receipt
} from '@/components/warehouses'

import { ROLES } from '@/utils/consts'

export function ProductionRoutes() {
  return (
    <Routes>
      <Route
        path='inicio'
        element={
          <ProtectedRoute allowedRoles={[ROLES.WAREHOUSE, ROLES.PROCESSES]}>
            <Production />
          </ProtectedRoute>
        }
      />
      <Route
        path='almacenes'
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.WAREHOUSE, ROLES.PRODUCTS]}
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
              allowedRoles={[ROLES.WAREHOUSE, ROLES.PRODUCTS]}
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
              allowedRoles={[ROLES.WAREHOUSE, ROLES.PRODUCTS]}
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
              allowedRoles={[ROLES.WAREHOUSE, ROLES.PRODUCTS]}
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
              allowedRoles={[ROLES.WAREHOUSE, ROLES.PRODUCTS]}
              redirectPath='/app/produccion/inicio'
            >
              <FinishedProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path='recibo-mercancia'
          element={
            <ProtectedRoute
              allowedRoles={[ROLES.WAREHOUSE, ROLES.PRODUCTS]}
              redirectPath='/app/produccion/inicio'
            >
              <Receipt />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path='formulas'
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.WAREHOUSE, ROLES.RECIPES]}
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
              allowedRoles={[ROLES.WAREHOUSE, ROLES.RECIPES]}
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
              allowedRoles={[ROLES.WAREHOUSE, ROLES.RECIPES]}
              redirectPath='/app/produccion/inicio'
            >
              <Formulation />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='procesos'>
        <Route
          path='tabla'
          element={
            <ProtectedRoute
              allowedRoles={[ROLES.WAREHOUSE]}
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
              allowedRoles={[ROLES.WAREHOUSE, ROLES.PROCESSES]}
              redirectPath='/app/produccion/inicio'
            >
              <ProcessesKanvas />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
