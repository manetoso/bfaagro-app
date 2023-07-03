import { useState } from 'react'
import { Input } from '../form'

/**
 *
 * @param {{ companyData: {id: string, name: string, address: string}, submit: () => ({id: string, name: string, address: string}) }} props
 * @returns
 */
export function CompanyData({ companyData, submit }) {
  const [changed, setChanged] = useState(false)

  const handleChange = (e) => {
    if (e.target.value !== companyData[e.target.name]) {
      setChanged(true)
    } else {
      setChanged(false)
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
    submit(data)
    setChanged(false)
  }
  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h3 className='text-2xl font-bold text-gray-800'>Datos de la empresa</h3>
      <input
        name='id'
        type='text'
        defaultValue={companyData?.id || ''}
        className='hidden'
      />
      <Input
        defaultValue={companyData?.name}
        id='name'
        label='Nombre de la empresa'
        name='name'
        placeholder='BFA AGRO SA DE CV'
        required={false}
        onChange={handleChange}
        type='text'
      />
      <Input
        defaultValue={companyData?.address}
        id='address'
        label='Dirección de la empresa'
        name='address'
        placeholder='CAMINO A LA LUZ #109 PREDIO RUSTICO EL CUIJE, CELAYA, GUANAJUATO, 38140 CELAYA, GUANAJUATO.'
        required={false}
        onChange={handleChange}
        type='text'
      />
      {changed && (
        <button type='submit' className='btn self-end'>
          Guardar
        </button>
      )}
    </form>
  )
}
