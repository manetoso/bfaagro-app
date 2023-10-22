import { Route, Routes } from 'react-router-dom'

import { Users } from '@/pages'
import { ProtectedRoute } from '@/components/layout'

export function UsersRoutes() {
  return (
    <Routes>
      <Route
        path='inicio'
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
