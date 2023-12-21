import { useState } from 'react'

import { Input } from '@/components/form'
import { handleInputMinValue } from '@/utils/utils'
import { useProcessesStore } from '@/stores'

export function IncompleteForm({ selectedRow, submitAction, field }) {
  const { movementTypes } = useProcessesStore()
  const [isEmpty, setIsEmpty] = useState(false)

  const handleSubmit = async (e) => {
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

    const formatedData = {
      id: selectedRow?.id,
      movementType: {
        movementTypeId: movementTypes[0].id,
        value: movementTypes[0].value
      },
      products: [
        {
          productId: selectedRow?.recipeData?.product?.id,
          productName: selectedRow?.recipeData?.product?.name,
          productQuantity: data.quantity
        }
      ]
    }

    // console.log({ data })
    // console.log({ formatedData })
    submitAction(formatedData, field)
  }

  return (
    <>
      <form
        className='mx-auto mt-4 flex max-w-sm flex-col items-center gap-2'
        onSubmit={handleSubmit}
      >
        <small className='text-xs font-bold text-gray-400'>
          Este proceso será removido de la lista de procesos pendientes
        </small>
        <Input
          defaultValue={selectedRow?.recipeData?.product?.name || ''}
          id='product'
          label='Producto'
          name='product'
          type='text'
          disabled
        />
        <Input
          defaultValue={0}
          id='quantity'
          isEmpty={isEmpty}
          label='Cantidad completada'
          name='quantity'
          type='number'
          required={false}
          onChange={(e) => handleInputMinValue(e, 0)}
        />
        <button type='submit' className='btn self-end'>
          Guardar
        </button>
      </form>
    </>
  )
}
