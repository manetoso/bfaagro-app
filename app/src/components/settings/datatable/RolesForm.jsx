import { useState } from 'react'

import { Input } from '@/components/form'

/**
 *
 * @param {{ selectedRow: object, submitAction: () => void, field: string }} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function RolesForm({ selectedRow, submitAction, field }) {
  const [isEmpty, setIsEmpty] = useState(false)

  const handleChange = (e) => {
    e.target.value = e.target.value.toUpperCase()
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

    // CHECKING IF THERE ARE EMPTY FIELDS
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
          type='text'
          name='documentType'
          defaultValue='TIPO_ROL'
          className='hidden'
        />
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.value
          }
          id='value'
          isEmpty={isEmpty}
          label='Rol'
          name='value'
          placeholder='admin'
          type='text'
          onChange={handleChange}
        />
        <button type='submit' className='btn'>
          Guardar
        </button>
      </form>
    </>
  )
}
