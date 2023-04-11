import { useState } from 'react'

import { useRecipesStore } from '@/stores'
import { ComboBox } from '@/components/form/ComboBox'
import { InfiniteInput } from './InfiniteInput'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const [isEmpty, setIsEmpty] = useState(false)
  const { detailProductsData, productsData, unityTypes } = useRecipesStore()

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

    // DEFINING THE PRODUCT
    data.product = {
      id: data['product[id]'],
      name: data['product[name]']
    }
    delete data['product[id]']
    delete data['product[name]']

    data.unity = data['unity[unityType]']
    delete data['unity[id]']
    delete data['unity[unityType]']

    const firstInfiniteInput = []
    const firstInfiniteNameInput = []
    const secondInfiniteInput = []
    const details = []
    for (const [key, value] of formData.entries()) {
      if (key.includes('firstInfiniteInput') && key.includes('name')) {
        firstInfiniteNameInput.push(value)
        delete data[key]
      }
      if (key.includes('firstInfiniteInput') && key.includes('id')) {
        firstInfiniteInput.push(value)
        delete data[key]
      }
      if (key.includes('secondInfiniteInput')) {
        secondInfiniteInput.push(Number(value))
        delete data[key]
      }
    }
    firstInfiniteInput.forEach((id, index) => {
      details.push({
        id: id,
        name: firstInfiniteNameInput[index],
        quantity: secondInfiniteInput[index]
      })
    })
    data.details = details

    submitAction(data, field)
  }
  return (
    <>
      <form
        className='mx-auto mt-4 flex flex-col items-center gap-2'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col md:flex-row w-full gap-8'>
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
              data={detailProductsData}
              rawMaterials={selectedRow.details}
              placeholder='Cantidad'
            />
          </div>
          <div className='flex flex-1 flex-col gap-2'>
            <h3 className='text-xl font-bold'>Producto</h3>
            <ComboBox
              data={productsData}
              dataDisplayAttribute='name'
              name='product'
              defaultSelected={
                Object.keys(selectedRow).length !== 0 &&
                selectedRow.product.name
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
            <ComboBox
              data={unityTypes}
              dataDisplayAttribute='unityType'
              name='unity'
              defaultSelected={
                Object.keys(selectedRow).length === 0 ? '' : selectedRow.unity
              }
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
