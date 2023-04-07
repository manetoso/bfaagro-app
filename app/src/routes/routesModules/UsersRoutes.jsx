import { Route, Routes } from "react-router-dom";

import { Users } from "@/pages";
import { ProtectedRoute } from "@/components/layout";

export function UsersRoutes({ permissions, roles }) {
	return (
		<Routes>
      <Route
        path='inicio'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
          >
            <Users />
          </ProtectedRoute>
        }
      />
    </Routes>
	)
}
