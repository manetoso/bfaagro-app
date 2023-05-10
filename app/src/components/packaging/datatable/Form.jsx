import { useState } from 'react'

import { usePackagingStore } from '@/stores'
import { ComboBox, Input } from '@/components/form'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const [isEmpty, setIsEmpty] = useState(false)
  const { finishedProducts, packagingProducts } = usePackagingStore()

  const handleMinMaxValue = (e, minValue, maxValue) => {
    if (e.target.value > maxValue) {
      e.target.value = maxValue
    }
    if (e.target.value < minValue) {
      e.target.value = minValue
    }
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
        <div className='flex w-full flex-col gap-8 md:flex-row'>
          <div className='flex flex-1 flex-col gap-2'>
            <h3 className='text-xl font-bold'>Producto a embalajar</h3>
            <ComboBox
              data={finishedProducts}
              dataDisplayAttribute='name'
              name='product'
              defaultSelected={
                Object.keys(selectedRow).length !== 0 &&
                selectedRow.product.name
              }
            />
            <Input
              defaultValue={0}
              id='quantity'
              isEmpty={isEmpty}
              label='Cantidad'
              name='quantity'
              noMaxWith
              onChange={(e) => handleMinMaxValue(e, 0, 999999999)}
              placeholder='30'
              type='number'
            />
          </div>
          <div className='flex flex-1 flex-col gap-2'>
            <h3 className='text-xl font-bold'>Embalaje a usar</h3>
            <ComboBox
              data={packagingProducts}
              dataDisplayAttribute='name'
              name='product'
              defaultSelected={
                Object.keys(selectedRow).length !== 0 &&
                selectedRow.product.name
              }
            />
            <Input
              defaultValue={0}
              id='quantity'
              isEmpty={isEmpty}
              label='Cantidad'
              name='quantity'
              noMaxWith
              onChange={(e) => handleMinMaxValue(e, 0, 999999999)}
              placeholder='30'
              type='number'
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
