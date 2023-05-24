import { useMemo, useState } from 'react'

import { FIELDS_TYPES, useProcessesStore } from '@/stores/useProcessesStore'

import { EmptyModal } from '@/components/alert'
import { PROCESSES_STATUS } from '@/utils/consts'
import { ProcessesDetails } from './'

const STATUS_COLOR = {
  PENDIENTE: 'text-amber-500',
  FINALIZADO: 'text-sky-500'
}
const STATUS_BG_COLOR = {
  PENDIENTE: 'bg-amber-200',
  FINALIZADO: 'bg-sky-100'
}

function KanvaCard({ process, changeProcessStatus, field, openModal }) {
  const handleFinish = () => {
    changeProcessStatus(process.id, field)
  }
  return (
    <div
      className={`flex min-w-full flex-col gap-2 rounded-md p-2 shadow-md ${
        STATUS_BG_COLOR[process.status.value]
      }`}
    >
      <span>
        <label>Producto:</label>
        <h6 className='font-bold'>
          {process.recipeData.product.name}, {process.recipeData.quantity}{' '}
          {process.recipeData.unity}
        </h6>
      </span>
      <span>
        <label>Fecha:</label>
        <h6 className='font-bold'>{process.createdAtFormatted}</h6>
      </span>
      <span className='flex justify-end gap-2 md:flex-row md:gap-2'>
        {process.status.value !== PROCESSES_STATUS.FINISHED ? (
          <>
            <button
              onClick={openModal}
              className='btn-sm bg-black/10 text-black hover:bg-black/20 focus-visible:ring-black'
            >
              Detalle
            </button>
            {process.status.value !== PROCESSES_STATUS.FINISHED && (
              <button onClick={handleFinish} className='btn-sm'>
                Sig. Estado
              </button>
            )}
          </>
        ) : (
          <strong
            className={`w-full px-1 text-right ${
              STATUS_COLOR[process.status.value]
            }`}
          >
            {process.status.value}
          </strong>
        )}
      </span>
    </div>
  )
}

export function ProcessesKanva({ processesData }) {
  const [todoProcesses, setTodoProcesses] = useState([])
  const [doneProcesses, setDoneProcesses] = useState([])
  const {
    recipes,
    materials,
    detailModal,
    toggleDetailModal,
    selected,
    processesStatus,
    changeProcessStatus
  } = useProcessesStore()

  useMemo(() => {
    if (processesData.length > 0) {
      const todayDate = new Date()
      setTodoProcesses(
        processesData.filter(
          (process) =>
            process.status?.value ===
            processesStatus.filter(
              (status) => status.value === PROCESSES_STATUS.PENDING
            )[0].value
        )
      )
      setDoneProcesses(
        processesData.filter((process) => {
          const processDate = new Date(process.createdAt)
          const msBetweenDates = Math.abs(
            processDate.getTime() - todayDate.getTime()
          )
          const daysBetweenDates = Math.floor(
            msBetweenDates / (24 * 60 * 60 * 1000)
          )
          const isProcessFromThisMonth = daysBetweenDates <= 30
          return (
            process.status?.value ===
              processesStatus.filter(
                (status) => status.value === PROCESSES_STATUS.FINISHED
              )[0].value && isProcessFromThisMonth
          )
        })
      )
    }
  }, [processesData])
  return (
    <>
      <section className='mt-4 grid max-h-[80vh] min-w-[46rem] grid-cols-2 overflow-y-auto rounded-md border-2'>
        <div className='flex min-h-[10rem] w-full flex-col items-center gap-4 border-r-2 p-4'>
          <h3 className='font-bold text-amber-500'>
            {PROCESSES_STATUS.PENDING}
          </h3>
          {todoProcesses.length > 0 &&
            todoProcesses.map((process) => (
              <KanvaCard
                key={process.id}
                process={process}
                field={FIELDS_TYPES.PROCESSES}
                openModal={() => toggleDetailModal(process)}
                changeProcessStatus={changeProcessStatus}
              />
            ))}
        </div>
        <div className='flex min-h-[10rem] w-full flex-col items-center gap-4 p-4'>
          <h3 className='font-bold text-sky-500'>
            {PROCESSES_STATUS.FINISHED}
          </h3>
          {doneProcesses.length > 0 &&
            doneProcesses.map((process) => (
              <KanvaCard
                key={process.id}
                process={process}
                field={FIELDS_TYPES.PROCESSES}
                openModal={() => toggleDetailModal(process)}
                changeProcessStatus={changeProcessStatus}
              />
            ))}
        </div>
      </section>
      <EmptyModal
        closeModal={() => toggleDetailModal({})}
        isOpen={detailModal}
        title='Detalle del proceso'
      >
        <ProcessesDetails
          process={selected}
          recipes={recipes}
          materials={materials}
        />
      </EmptyModal>
    </>
  )
}
