import { useMemo, useState } from 'react'

import { FIELDS_TYPES, useProcessesStore } from '@/stores/useProcessesStore'

import { EmptyModal } from '@/components/alert'
import { ProcessesDetails } from './'

const STATUS_COLOR = {
  PENDIENTE: 'text-stone-500',
  'EN PROCESO': 'text-amber-500',
  'PENDIENTE DE VALIDAR': 'text-sky-500'
}
const STATUS_BG_COLOR = {
  PENDIENTE: 'bg-stone-200',
  'EN PROCESO': 'bg-amber-100',
  'PENDIENTE DE VALIDAR': 'bg-sky-100'
}

function KanvaCard({ process, changeProcessStatus, field, openModal }) {
  const handleFinish = () => {
    changeProcessStatus(
      process.id,
      field
    )
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
        <label>Almacen:</label>
        <h6 className='font-bold'>{process.warehouse.name}</h6>
      </span>
      <span>
        <label>Fecha:</label>
        <h6 className='font-bold'>
          {process.createdAtFormatted}
        </h6>
      </span>
      <span className='flex justify-end gap-2 md:flex-row md:gap-2'>
        {process.status.value !== 'PENDIENTE DE VALIDAR' ? (
          <>
            <button
              onClick={openModal}
              className='btn-sm bg-black/10 text-black hover:bg-black/20 focus-visible:ring-black'
            >
              Detalle
            </button>
            {process.status.value !== 'PENDIENTE DE VALIDAR' && (
              <button onClick={handleFinish} className='btn-sm'>
                Terminar
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
  const [reviewProcesses, setReviewProcesses] = useState([])
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
      setTodoProcesses(
        processesData.filter(
          (process) => process.status?.value === processesStatus[0].value
        )
      )
      setReviewProcesses(
        processesData.filter(
          (process) => process.status?.value === processesStatus[1].value
        )
      )
      setDoneProcesses(
        processesData.filter(
          (process) => process.status?.value === processesStatus[2].value
        )
      )
    }
  }, [processesData])
  return (
    <>
      <section className='mt-4 grid min-w-[46rem] grid-cols-3 rounded-md border-2'>
        <div className='flex min-h-[10rem] w-full flex-col items-center gap-4 border-r-2 p-4'>
          <h3 className='font-bold text-stone-500'>PENDIENTE</h3>
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
        <div className='flex min-h-[10rem] w-full flex-col items-center gap-4 border-r-2 p-4'>
          <h3 className='font-bold text-amber-500'>EN PROCESO</h3>
          {reviewProcesses.length > 0 &&
            reviewProcesses.map((process) => (
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
          <h3 className='font-bold'>
            <strong className='text-sky-500'>PENDIENTE DE VALIDAR</strong>
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
