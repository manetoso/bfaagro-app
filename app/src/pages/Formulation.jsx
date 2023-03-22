import { PageTransition } from '@/components/layout/PageTransition'
import { Recipes } from '@/components/formulation'

export function Formulation() {
  return (
    <PageTransition>
      <h1 className='text-3xl font-black uppercase'>Fórmulas</h1>
      <Recipes />
    </PageTransition>
  )
}
