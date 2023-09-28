import { useLogbookDatatable } from '@/hooks/useLogbookDatatable'

import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'

import { Datatable } from '../datatable'
import { LogbookCharts, LogbookDetails } from './components'
import { EmptyModal } from '../alert'

export function LogbookDatatable() {
  const {
    logbookData,
    detailsModal,
    selected,
    toggleDetailsModalModal,
    columns,
    isLoading
  } = useLogbookDatatable()
  if (isLoading) return <Loader />
  return (
    <>
      <CustomToast />
      <div className='relative'>
        <h2 className='mb-4 text-2xl font-black'>Bitácora</h2>
        <LogbookCharts />
        <Datatable columns={columns} data={logbookData} title='Bitácora' />
        <EmptyModal
          closeModal={() => toggleDetailsModalModal({})}
          isOpen={detailsModal}
          title='Detalles'
        >
          <LogbookDetails selected={selected} />
        </EmptyModal>
      </div>
    </>
  )
}
