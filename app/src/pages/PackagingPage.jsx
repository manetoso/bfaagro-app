import { PageTransition } from '@/components/layout/PageTransition'
import { Packaging } from '@/components/packaging'

export function PackagingPage() {
  return (
    <PageTransition>
      <h1 className='text-3xl font-black uppercase'>Embalaje</h1>
      <Packaging />
    </PageTransition>
  )
}
