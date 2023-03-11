import { PageTransition } from '@/components/layout/PageTransition'
import { useAuthStore } from '@/stores'
import { Navigate } from 'react-router-dom'

export function Auth({ isAuthenticated }) {
  const login = useAuthStore((store) => store.login)
  if (isAuthenticated) {
    return <Navigate to='/app/inicio' replace />
  }
  const handleLogin = () => {
    login({ username: 'admin' })
  }
  return (
    <PageTransition>
      <div className='flex min-h-screen items-center justify-center'>
        <section className='flex flex-col'>
          <h1>Inicio de Sesion</h1>
          <button onClick={handleLogin}>Acceder</button>
        </section>
      </div>
    </PageTransition>
  )
}
