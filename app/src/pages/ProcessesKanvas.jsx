import { PageTransition } from '@/components/layout/PageTransition'
import { ProcessesKanvas as ProcessesComponent } from '@/components/processes'

export function ProcessesKanvas() {
  return (
    <PageTransition>
      <h1 className='text-3xl font-black uppercase'>Tablero de Procesos</h1>
      <ProcessesComponent />
    </PageTransition>
  )
}
