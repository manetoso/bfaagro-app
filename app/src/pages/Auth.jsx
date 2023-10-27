import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/stores'

import { PageTransition } from '@/components/layout/PageTransition'
import { CustomToast } from '@/components/toast'
import { AuthHeader, LoginForm } from '@/components/auth'
import { Loader } from '@/components/layout'

export function Auth({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate to='/app/inicio' replace />
  }
  const { isLoading } = useAuthStore()

  return (
    <PageTransition>
      <CustomToast />
      <svg
        className='fixed top-0 left-0 -z-30'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#0C923F'
          fillOpacity='1'
          d='M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,266.7C672,288,768,288,864,261.3C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
        />
      </svg>
      <svg
        className='fixed top-0 left-0 -z-40'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#6EBC8C'
          fillOpacity='1'
          d='M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,202.7C672,192,768,128,864,138.7C960,149,1056,235,1152,224C1248,213,1344,107,1392,53.3L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
        />
      </svg>
      <svg
        className='fixed top-0 left-0 -z-50'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#9FD0B2'
          fillOpacity='1'
          d='M0,128L48,144C96,160,192,192,288,224C384,256,480,288,576,266.7C672,245,768,171,864,149.3C960,128,1056,160,1152,181.3C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
        />
      </svg>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex min-h-screen flex-col items-center justify-center gap-8 md:flex-row'>
          <AuthHeader />
          <LoginForm />
        </div>
      )}
    </PageTransition>
  )
}
