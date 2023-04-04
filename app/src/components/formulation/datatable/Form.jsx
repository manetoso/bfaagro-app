import { useState } from 'react'

import { ComboBox } from '@/components/form/ComboBox'
import { InfiniteInput } from './InfiniteInput'

const products = [
  {
    id: 1,
    name: 'Cyrille'
  },
  {
    id: 2,
    name: 'Aharon'
  },
  {
    id: 3,
    name: 'Jedidiah'
  },
  {
    id: 4,
    name: 'Wain'
  },
  {
    id: 5,
    name: 'Lou'
  },
  {
    id: 6,
    name: 'Tedda'
  },
  {
    id: 7,
    name: 'Virgie'
  },
  {
    id: 8,
    name: 'Kev'
  },
  {
    id: 9,
    name: 'Martitia'
  },
  {
    id: 10,
    name: 'Parry'
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
    data.productName = data['product[name]']
    delete data['product[id]']
    delete data['product[name]']

    const firstInfiniteInput = []
    const firstInfiniteNameInput = []
    const secondInfiniteInput = []
    const rawMaterials = []
    for (const [key, value] of formData.entries()) {
      if (key.includes('firstInfiniteInput') && key.includes('name')) {
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
        idProduct: id,
        name: firstInfiniteNameInput[index],
        quantity: secondInfiniteInput[index]
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
              dataDisplayAttribute='name'
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
