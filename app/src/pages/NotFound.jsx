import { Navigate } from 'react-router-dom'

export function NotFound({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate to='/app/inicio' replace />
  } else {
    return <Navigate to='/autenticacion' replace />
  }
}
