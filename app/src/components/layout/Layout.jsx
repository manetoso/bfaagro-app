import { Navigate, Outlet } from 'react-router-dom'
import { Navigation } from '../navigation'

/**
 *
 * @param {{isAuthenticated: boolean}} props
 * @returns {JSX.Element} Layout component
 */
export function Layout({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to='/autenticacion' replace />
  }
  return (
    <>
      <Navigation />
      <main className='mx-auto mb-10 mt-20 max-w-[1000px] flex-1 overflow-y-auto px-4'>
        <Outlet />
      </main>
    </>
  )
}
