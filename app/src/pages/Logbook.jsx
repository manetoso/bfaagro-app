import { PageTransition } from '@/components/layout'
import { LogbookDatatable } from '@/components/logbook'

export function Logbook() {
  return (
    <PageTransition>
      <LogbookDatatable />
    </PageTransition>
  )
}
