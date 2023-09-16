import { useLogbookDatatable } from '@/hooks/useLogbookDatatable'

import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'

import { Datatable } from '../datatable'
import { LogbookDetails } from './components/LogbookDetails'
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
      <div className='relative mt-4'>
        <Datatable columns={columns} data={logbookData} title='Bitácora' />
        <EmptyModal
          closeModal={() => toggleDetailsModalModal({})}
          isOpen={detailsModal}
          title='Detalles'
        >
          <LogbookDetails selected={selected} />
          {/* <pre>{JSON.stringify(selected, null, 2)}</pre> */}
        </EmptyModal>
      </div>
    </>
  )
}
