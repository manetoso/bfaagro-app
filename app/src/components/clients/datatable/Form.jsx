import { useState } from 'react'

import { useClientsStore } from '@/stores/useClientsStore'

import { Input, ComboBox } from '@/components/form'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const { clientsTypesData } = useClientsStore()
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

    const formatedData = {
      ...data,
      clientType: {
        clientTypeId: data['type[id]'],
        clientType: data['type[value]']
      }
    }
    delete formatedData['type[id]']
    delete formatedData['type[value]']

    // console.log({ formatedData })
    submitAction(formatedData, field)
  }

  return (
    <>
      <form
        className='mx-auto mt-4 flex w-full flex-col gap-2'
        onSubmit={handleSubmit}
      >
        <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0 ? '' : selectedRow.name
            }
            id='name'
            isEmpty={isEmpty}
            required={false}
            label='Nombre del cliente'
            name='name'
            placeholder='Fernando'
            type='text'
          />
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0 ? '' : selectedRow.lastName
            }
            id='lastName'
            isEmpty={isEmpty}
            required={false}
            label='Apellidos'
            name='lastName'
            placeholder='Tapia'
            type='text'
          />
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0
                ? ''
                : selectedRow.phoneNumber
            }
            required={false}
            id='phoneNumber'
            isEmpty={isEmpty}
            label='Teléfono'
            name='phoneNumber'
            placeholder='(55) 1234 5678'
            type='text'
          />
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0 ? '' : selectedRow.email
            }
            id='email'
            isEmpty={isEmpty}
            required={false}
            label='Correo electrónico'
            name='email'
            placeholder='fernando@gmail.com'
            type='email'
          />
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0 ? '' : selectedRow.address
            }
            id='address'
            isEmpty={isEmpty}
            required={false}
            label='Dirección'
            name='address'
            placeholder='fernando@gmail.com'
            type='text'
          />
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0 ? '' : selectedRow.company
            }
            id='company'
            isEmpty={isEmpty}
            required={false}
            label='Nombre de empresa'
            name='company'
            placeholder='Empresa SA de CV'
            type='text'
          />
          <ComboBox
            data={clientsTypesData}
            dataDisplayAttribute='value'
            defaultSelected={
              Object.keys(selectedRow).length === 0
                ? ''
                : selectedRow.clientType.clientType
            }
            id='type'
            label='Tipo de cliente'
            name='type'
          />
        </div>
        <button type='submit' className='btn self-end'>
          Guardar
        </button>
      </form>
    </>
  )
}
