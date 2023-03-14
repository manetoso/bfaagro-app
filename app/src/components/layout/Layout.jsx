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
      <main className='my-5 mx-auto max-w-[1000px] flex-1 px-4 overflow-y-auto mt-16'>
        <Outlet />
      </main>
    </>
  )
}
