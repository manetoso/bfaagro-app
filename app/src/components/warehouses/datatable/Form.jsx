import { useState } from 'react'

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
    submitAction(data, field)
  }
  return (
    <>
      <form
        className='mx-auto mt-4 flex max-w-xs flex-col items-center gap-2'
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
          className={`w-full text-xl font-bold focus:outline-none ${
            isEmpty && 'placeholder-rose-500'
          }`}
          type='text'
          name='name'
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.name
          }
          placeholder='Nombre'
        />
        <input
          className={`input w-full ${isEmpty && 'border-rose-500'}`}
          type='number'
          name='quantity'
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.quantity
          }
          placeholder='Cantidad'
        />
        <input
          className={`input w-full ${isEmpty && 'border-rose-500'}`}
          type='text'
          name='unity'
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.unity
          }
          placeholder='Unidad de Medida'
        />
        <input
          className={`input w-full ${isEmpty && 'border-rose-500'}`}
          type='number'
          name='idProductType'
          defaultValue={
            Object.keys(selectedRow).length === 0
              ? ''
              : selectedRow.idProductType
          }
          placeholder='Tipo de Producto'
        />
        <input
          className={`input w-full ${isEmpty && 'border-rose-500'}`}
          type='number'
          name='idWarehouse'
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.idWarehouse
          }
          placeholder='Almacén'
        />
        <button type='submit' className='btn'>
          Guardar
        </button>
      </form>
    </>
  )
}
