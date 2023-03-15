import { PageTransition } from '@/components/layout/PageTransition'
import { Outlet } from 'react-router-dom'

export function Warehouses() {
  return (
    <PageTransition>
      <h1 className='text-3xl font-black uppercase'>Almacenes</h1>
      <Outlet />
    </PageTransition>
  )
}
