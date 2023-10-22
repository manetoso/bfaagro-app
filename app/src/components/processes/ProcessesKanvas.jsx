import { ProcessesKanva } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'

import { useProcessesDatatable } from '@/hooks/useProcessesDatatable'
import { FIELDS_TYPES } from '@/stores/useProcessesStore'

export function ProcessesKanvas() {
  const { processesData, toggleEditModal, isLoading } = useProcessesDatatable({
    field: FIELDS_TYPES.PROCESSES
  })
  if (isLoading) return <Loader />
  return (
    <>
      <CustomToast />
      <div className='overflow-x-scroll'>
        <ProcessesKanva
          processesData={processesData}
          toggleEditModal={toggleEditModal}
        />
      </div>
    </>
  )
}
