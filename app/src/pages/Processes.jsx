import { PageTransition } from '@/components/layout/PageTransition'
import { Processes as ProcessesComponent } from '@/components/processes'

export function Processes() {
  return (
    <PageTransition>
      <h1 className='text-3xl font-black uppercase'>Procesos</h1>
      <ProcessesComponent />
    </PageTransition>
  )
}
