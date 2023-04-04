import { Route, Routes } from "react-router-dom";

import { Purchases } from "@/pages";
import { ProtectedRoute } from "@/components/layout";

export function PurchasesRoutes({ permissions, roles }) {
	return (
		<Routes>
      <Route
        path='inicio'
        element={
          <ProtectedRoute
            isAllow={permissions.includes('write') && roles.includes('admin')}
          >
            <Purchases />
          </ProtectedRoute>
        }
      />
    </Routes>
	)
}
