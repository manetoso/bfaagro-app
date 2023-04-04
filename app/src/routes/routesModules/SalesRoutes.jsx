import { Route, Routes } from "react-router-dom";

import { Sales } from "@/pages";
import { ProtectedRoute } from "@/components/layout";

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
    </Routes>
	)
}
