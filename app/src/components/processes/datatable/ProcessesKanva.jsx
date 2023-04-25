import { useMemo, useState } from 'react'

import { FIELDS_TYPES, useProcessesStore } from '@/stores/useProcessesStore'

import { EmptyModal } from '@/components/alert'
import { ProcessesDetails } from './'

const STATUS_COLOR = {
  Pendiente: 'text-amber-500',
  Revisión: 'text-sky-500',
  Terminado: 'text-emerald-500',
  Cancelado: 'text-rose-500'
}
const STATUS_BG_COLOR = {
  Pendiente: 'bg-amber-100',
  Revisión: 'bg-sky-100',
  Terminado: 'bg-emerald-100',
  Cancelado: 'bg-rose-100'
}

function KanvaCard({ recipe, addOrEditElement, field, openModal }) {
  const handleFinish = () => {
    addOrEditElement(
      {
        ...recipe,
        status: 'Revisión'
      },
      field
    )
  }
  return (
    <div
      className={`flex min-w-full flex-col gap-2 rounded-md p-2 shadow-md ${
        STATUS_BG_COLOR[recipe.status]
      }`}
    >
      <span>
        <label>Producto:</label>
        <h6 className='font-bold'>
          {recipe.recipeData.product.name}, {recipe.recipeData.quantity}{' '}
          {recipe.recipeData.unity}
        </h6>
      </span>
      <span>
        <label>Almacen:</label>
        <h6 className='font-bold'>{recipe.warehouseName}</h6>
      </span>
      <span>
        <label>Fecha:</label>
        {/* <h6 className='font-bold'></h6> */}
      </span>
      <span className='flex justify-end gap-2 md:flex-row md:gap-2'>
        {recipe.status === 'Pendiente' ? (
          <>
            <button
              onClick={openModal}
              className='btn-sm bg-black/10 text-black hover:bg-black/20 focus-visible:ring-black'
            >
              Detalle
            </button>
            {recipe.status === 'Pendiente' && (
              <button onClick={handleFinish} className='btn-sm'>
                Terminar
              </button>
            )}
          </>
        ) : (
          <strong
            className={`w-full px-1 text-right ${STATUS_COLOR[recipe.status]}`}
          >
            {recipe.status}
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
    addOrEditElement,
    recipes,
    materials,
    detailModal,
    toggleDetailModal,
    selected
  } = useProcessesStore()

  useMemo(() => {
    if (processesData.length > 0) {
      setTodoProcesses(
        processesData.filter((process) => process.status === 'Pendiente')
      )
      setReviewProcesses(
        processesData.filter((process) => process.status === 'Revisión')
      )
      setDoneProcesses(
        processesData.filter(
          (process) =>
            process.status === 'Terminado' || process.status === 'Cancelado'
        )
      )
    }
  }, [processesData])
  return (
    <>
      <section className='mt-4 grid min-w-[46rem] grid-cols-3 rounded-md border-2'>
        <div className='flex min-h-[10rem] w-full flex-col items-center gap-4 border-r-2 p-4'>
          <h3 className='font-bold text-amber-500'>Pendiente</h3>
          {todoProcesses.length > 0 &&
            todoProcesses.map((recipe) => (
              <KanvaCard
                key={recipe.id}
                recipe={recipe}
                field={FIELDS_TYPES.RECIPES}
                openModal={() => toggleDetailModal(recipe)}
                addOrEditElement={addOrEditElement}
              />
            ))}
        </div>
        <div className='flex min-h-[10rem] w-full flex-col items-center gap-4 border-r-2 p-4'>
          <h3 className='font-bold text-sky-500'>Revisión</h3>
          {reviewProcesses.length > 0 &&
            reviewProcesses.map((recipe) => (
              <KanvaCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
        <div className='flex min-h-[10rem] w-full flex-col items-center gap-4 p-4'>
          <h3 className='font-bold'>
            <strong className='text-emerald-500'>Terminado</strong> /{' '}
            <strong className='text-rose-500'>Cancelado</strong>
          </h3>
          {doneProcesses.length > 0 &&
            doneProcesses.map((recipe) => (
              <KanvaCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
      </section>
      <EmptyModal
        closeModal={() => toggleDetailModal({})}
        isOpen={detailModal}
        title='Detalle del proceso'
      >
        <ProcessesDetails
          recipe={selected}
          recipes={recipes}
          materials={materials}
        />
      </EmptyModal>
    </>
  )
}
