import { useState } from 'react'

import { ComboBox } from '@/components/form/ComboBox'
import { InfiniteInput } from './InfiniteInput'

const products = [
  {
    id: 1,
    NOMBRE: 'Cyrille'
  },
  {
    id: 2,
    NOMBRE: 'Aharon'
  },
  {
    id: 3,
    NOMBRE: 'Jedidiah'
  },
  {
    id: 4,
    NOMBRE: 'Wain'
  },
  {
    id: 5,
    NOMBRE: 'Lou'
  },
  {
    id: 6,
    NOMBRE: 'Tedda'
  },
  {
    id: 7,
    NOMBRE: 'Virgie'
  },
  {
    id: 8,
    NOMBRE: 'Kev'
  },
  {
    id: 9,
    NOMBRE: 'Martitia'
  },
  {
    id: 10,
    NOMBRE: 'Parry'
  }
]

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const [isEmpty, setIsEmpty] = useState(false)

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
    data.idProduct = data['product[id]']
    data.productName = data['product[NOMBRE]']
    delete data['product[id]']
    delete data['product[NOMBRE]']

    const firstInfiniteInput = []
    const firstInfiniteNameInput = []
    const secondInfiniteInput = []
    const rawMaterials = []
    for (const [key, value] of formData.entries()) {
      if (key.includes('firstInfiniteInput') && key.includes('NOMBRE')) {
        firstInfiniteNameInput.push(value)
        delete data[key]
      }
      if (key.includes('firstInfiniteInput') && key.includes('id')) {
        firstInfiniteInput.push(Number(value))
        delete data[key]
      }
      if (key.includes('secondInfiniteInput')) {
        secondInfiniteInput.push(Number(value))
        delete data[key]
      }
    }
    firstInfiniteInput.forEach((id, index) => {
      rawMaterials.push({
        ID_PRODUCT: id,
        NOMBRE: firstInfiniteNameInput[index],
        CANTIDAD: secondInfiniteInput[index]
      })
    })
    data.rawMaterials = rawMaterials

    // console.log(data)
    submitAction(data, field)
  }
  return (
    <>
      <form
        className='mx-auto mt-4 flex flex-col items-center gap-2'
        onSubmit={handleSubmit}
      >
        <input
          className='hidden'
          type='number'
          name='id'
          defaultValue={
            Object.keys(selectedRow).length === 0 ? modalId : selectedRow.id
          }
        />
        <input
          className='hidden'
          type='text'
          name='unity'
          defaultValue={
            Object.keys(selectedRow).length === 0 ? 'Litros' : selectedRow.unity
          }
        />
        <div className='flex w-full gap-8'>
          <div className='flex flex-1 flex-col gap-2'>
            <input
              className={`w-full text-xl font-bold focus:outline-none ${
                isEmpty && 'placeholder-rose-500'
              }`}
              type='text'
              name='recipeName'
              defaultValue={
                Object.keys(selectedRow).length === 0
                  ? ''
                  : selectedRow.recipeName
              }
              placeholder='Nombre Formula'
            />
            <InfiniteInput
              data={products}
              rawMaterials={selectedRow.rawMaterials}
              placeholder='Cantidad'
            />
          </div>
          <div className='flex flex-1 flex-col gap-2'>
            <h3 className='text-xl font-bold'>Producto</h3>
            <ComboBox
              data={products}
              dataDisplayAttribute='NOMBRE'
              name='product'
              defaultSelected={
                Object.keys(selectedRow).length !== 0
                  && selectedRow.productName
              }
            />
            <input
              className={`input w-full max-w-none ${
                isEmpty && 'border-rose-500'
              }`}
              type='number'
              name='quantity'
              defaultValue={
                Object.keys(selectedRow).length === 0
                  ? ''
                  : selectedRow.quantity
              }
              placeholder='Cantidad'
            />
          </div>
        </div>
        <button type='submit' className='btn self-end'>
          Guardar
        </button>
      </form>
    </>
  )
}
