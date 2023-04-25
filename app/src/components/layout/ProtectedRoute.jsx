import { Navigate } from 'react-router-dom'

/**
 *
 * @param {{isAllow: boolean, children: React.ReactNode, redirectPath?: string}} props
 * @returns {JSX.Element}
 */
export function ProtectedRoute({ isAllow, children, redirectPath = '/' }) {
  if (!isAllow) {
    return <Navigate to={redirectPath} replace />
  } else {
    return children
  }
}
