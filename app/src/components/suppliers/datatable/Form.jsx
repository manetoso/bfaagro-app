import { useState } from 'react'

import { useSuppliersStore } from '@/stores/useSuppliersStore'

import { Input, ComboBox } from '@/components/form'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const { supliierTypeData } = useSuppliersStore()
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

    data.type = {
      id: data['type[id]'],
      value: data['type[value]']
    }
    delete data['type[id]']
    delete data['type[value]']
    delete data['type[documentType]']

    submitAction(data, field)
  }

  return (
    <>
      <form
        className='mx-auto mt-4 flex max-w-xs flex-col items-center gap-2'
        onSubmit={handleSubmit}
      >
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.name
          }
          id='name'
          isEmpty={isEmpty}
          label='Nombre de empresa'
          name='name'
          placeholder='Empresa SA de CV'
          type='text'
        />
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.agent
          }
          id='agent'
          isEmpty={isEmpty}
          label='Nombre de agente'
          name='agent'
          placeholder='Fernando Tapia'
          type='text'
        />
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.phoneNumber
          }
          id='phoneNumber'
          isEmpty={isEmpty}
          label='Teléfono'
          name='phoneNumber'
          placeholder='(55) 1234 5678'
          type='text'
        />
        <ComboBox
          data={supliierTypeData}
          dataDisplayAttribute='value'
          defaultSelected={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.type.value
          }
          id='type'
          label='Tipo de proveedor'
          name='type'
        />
        <button type='submit' className='btn self-end'>
          Guardar
        </button>
      </form>
    </>
  )
}
