import { useEffect, useState } from 'react'

import { useProcessesStore } from '@/stores'
import { DetailInput } from './DetailInput'
import { ComboBox } from '@/components/form/ComboBox'

const detailsIds = []
const detailsOldMaterialId = []
const detailsOldQuantity = []
const detailsOldName = []
const detailsQuantity = []
const detailsName = []

const DETAILS = [
  {
    name: 'id',
    array: detailsIds
  },
  {
    name: 'oldMaterialId',
    array: detailsOldMaterialId
  },
  {
    name: 'oldQuantity',
    array: detailsOldQuantity
  },
  {
    name: 'oldName',
    array: detailsOldName
  },
  {
    name: 'newQuantity',
    array: detailsQuantity
  },
  {
    name: 'name',
    array: detailsName
  }
]

const STATUS_LABEL = {
  PENDIENTE: 'bg-stone-200 text-stone-500',
  'EN PROCESO': 'bg-amber-100 text-amber-500',
  'PENDIENTE DE VALIDAR': 'bg-sky-100 text-sky-500',
  FINALIZADO: 'bg-emerald-100 text-emerald-500'
}

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const [isEmpty, setIsEmpty] = useState(false)
  const [recipeSelected, setRecipeSelected] = useState(null)
  const {
    materials,
    recipes,
    warehouses,
    error,
    removeError,
    processesStatus,
    changeProcessStatus,
    selected
  } = useProcessesStore()

  useEffect(() => {
    removeError()
  }, [recipeSelected])

  const comboBoxOnChange = (item) => {
    setRecipeSelected(item)
  }

  const handleChangeProcessStatus = () => {
    changeProcessStatus(selectedRow.id, field)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = {}
    for (const [key, value] of formData.entries()) {
      if (!isNaN(value) && value !== '') {
        data[key] = parseFloat(value)
      } else {
        data[key] = value
      }
    }

    const newIsEmpty = Object.values(data).some((x) => x === null || x === '')
    setIsEmpty(newIsEmpty)

    if (newIsEmpty) return

    const details = []
    const detailsChanged = []

    if (error.status) {
      for (const [key, value] of formData.entries()) {
        DETAILS.forEach((detail) => {
          if (key.includes('material') && key.includes(detail.name)) {
            detail.array.push(value)
          }
        })
      }
      detailsIds.forEach((id, index) => {
        details.push({
          id,
          name: detailsName[index],
          quantity: Number(detailsQuantity[index])
        })
        details.push({
          id: detailsOldMaterialId[index],
          name: detailsOldName[index],
          quantity: Number(detailsOldQuantity[index]) || 0
        })
        detailsChanged.push({
          id: detailsOldMaterialId[index],
          name: detailsOldName[index],
          quantity: Number(detailsOldQuantity[index]) || 0
        })
      })
    }

    const recipeDetailsFiltered = recipeSelected?.details.filter((x) =>
      detailsChanged.some((y) => y.id !== x.id)
    )
    const newRecipe = [...recipeDetailsFiltered, ...details]
    const newRecipeFiltered = newRecipe.reduce((acc, current) => {
      const x = acc.find((item) => item.id === current.id)
      if (!x) {
        return acc.concat([current])
      } else {
        x.quantity += current.quantity
        return acc
      }
    }, [])
    newRecipeFiltered.forEach((x, index) => {
      if (x.quantity === 0) {
        newRecipeFiltered.splice(index, 1)
      }
    })

    const formatedData = {
      id: selectedRow?.id || 0,
      recipeId: data['recipeId[id]'],
      status: {
        id: data['status[id]'],
        value: data['status[value]']
      },
      warehouse: {
        id: data['warehouseId[id]'],
        name: data['warehouseId[name]']
      },
      recipeData: {
        // quantity: data['recipeId[quantity]'],
        // unity: data['recipeId[unity]'],
        recipeName: data['recipeId[recipeName]'],
        product: {
          id: data['recipeId[product][id]'],
          name: data['recipeId[product][name]']
        },
        details: error.status ? newRecipeFiltered : recipeSelected?.details
      }
    }
    submitAction(formatedData, field)
  }

  return (
    <>
      <form
        className='mx-auto mt-4 flex flex-col items-center gap-2'
        onSubmit={handleSubmit}
      >
        <div className='flex w-full flex-col gap-8 md:flex-row'>
          <div
            className={`flex flex-1 flex-col gap-2 ${
              selectedRow.status?.value && 'hidden'
            }`}
          >
            <div
              className={`flex flex-1 flex-col gap-2 ${
                Object.keys(selectedRow).length !== 0 && 'hidden'
              }`}
            >
              <div>
                <label className='text-black/50'>Formula:</label>
                <ComboBox
                  data={recipes}
                  dataDisplayAttribute='recipeName'
                  name='recipeId'
                  defaultSelected={
                    Object.keys(selectedRow).length !== 0 &&
                    selectedRow.recipeData.recipeName
                  }
                  getSelected={(item) => comboBoxOnChange(item)}
                />
              </div>
              <div>
                <label className='text-black/50'>Almacén:</label>
                <ComboBox
                  data={warehouses}
                  dataDisplayAttribute='name'
                  name='warehouseId'
                  defaultSelected={
                    Object.keys(selectedRow).length !== 0 &&
                    selectedRow.warehouseName
                  }
                />
              </div>
            </div>
          </div>
          <div className='flex flex-1 flex-col gap-2'>
            <h3 className='text-xl font-bold'>Detalle de la formula</h3>
            <div>
              <p>
                Materias Primas utilizadas para generar{' '}
                <strong>{`${recipeSelected?.quantity} ${recipeSelected?.unity}`}</strong>{' '}
                del producto <strong>{recipeSelected?.product.name}</strong>:
              </p>
              <ul className='mt-2 list-disc pl-6'>
                {selected.recipeData
                  ? selectedRow.recipeData?.details.map((detail, index) => {
                      return (
                        <li key={index}>
                          {detail.name}
                          {', '}
                          {detail.quantity} {recipeSelected?.unity}
                        </li>
                      )
                    })
                  : recipeSelected?.details.map((detail, index) => {
                      return (
                        <li key={index}>
                          {detail.name}
                          {', '}
                          {detail.quantity} {recipeSelected?.unity}
                        </li>
                      )
                    })}
              </ul>
              {error.status && (
                <div className='mt-2'>
                  <p className='text-sm font-bold text-red-500'>
                    {error.message}
                  </p>
                  <ul className='mt-6 flex flex-col gap-4'>
                    {error.details.map((detail, index) => {
                      return (
                        <DetailInput
                          key={index}
                          detail={detail}
                          index={index}
                          materials={materials}
                          isEmpty={isEmpty}
                        />
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          type='submit'
          className={`btn self-end ${selectedRow.status?.value && 'hidden'}`}
        >
          Guardar
        </button>
      </form>
      {selectedRow.status?.value && (
        <div className='mx-auto mt-4 flex flex-col items-end gap-2'>
          <span>
            Estado:{' '}
            <strong
              className={`rounded-full px-4 py-1 ${
                STATUS_LABEL[selectedRow.status?.value]
              }`}
            >
              {selectedRow.status?.value}
            </strong>
          </span>
          {selectedRow.status?.value !==
            processesStatus[processesStatus.length - 1].value && (
            <button
              type='submit'
              className='btn mt-2'
              onClick={handleChangeProcessStatus}
            >
              Siguiente Estado
            </button>
          )}
        </div>
      )}
    </>
  )
}
