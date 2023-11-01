import { useAuthStore } from '@/stores'
import { Navigate } from 'react-router-dom'

import { ROLES } from '@/utils/consts'

/**
 *
 * @param {{allowedRoles: string[], children: React.ReactNode, redirectPath?: string}} props
 * @returns {JSX.Element}
 */
export function ProtectedRoute({
  allowedRoles = [],
  children,
  redirectPath = '/'
}) {
  const { roles } = useAuthStore()
  if (roles.includes(ROLES.ADMIN)) return children

  if (allowedRoles.some((allowedRole) => roles.includes(allowedRole))) return children

  return <Navigate to={redirectPath} replace />
}
