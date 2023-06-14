import { PageTransition } from '@/components/layout/PageTransition'
import { PackagingRecipes, Recipes } from '@/components/formulation'

export function Formulation() {
  return (
    <PageTransition>
      <h1 className='text-3xl font-black uppercase'>Fórmulas</h1>
      {window.location.pathname.includes('embalaje') ? (
        <PackagingRecipes />
      ) : (
        <Recipes />
      )}
    </PageTransition>
  )
}
