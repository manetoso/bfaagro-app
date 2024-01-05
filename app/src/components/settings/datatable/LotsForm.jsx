import { useState } from 'react'
import { ChaoticOrbit } from '@uiball/loaders'

import { useWareHouseDatatable } from '@/hooks/useWareHouseDatatable'
import { FIELDS_TYPES } from '@/stores/useWarehouseStore'

import { Input, ComboBox } from '@/components/form'

/**
 *
 * @param {{ selectedRow: object, submitAction: () => void, field: string }} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function LotsForm({ selectedRow, submitAction, field }) {
  const { allProducts } = useWareHouseDatatable({ field: FIELDS_TYPES.ALL })
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

    const formattedData = {
      serialNumber: data.serialNumber,
      consecutive: data.consecutive,
      lastMade: data.lastMade,
      productId: data['product[id]']
    }
    // console.log({ data })
    // console.log({ formattedData })
    submitAction(formattedData, field)
  }
  return (
    <>
      <form
        className='mx-auto mt-4 flex max-w-xs flex-col items-center gap-2'
        onSubmit={handleSubmit}
      >
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0
              ? ''
              : selectedRow.serialNumber
          }
          id='serialNumber'
          isEmpty={isEmpty}
          label='Serie'
          name='serialNumber'
          placeholder='ABC'
          type='text'
          onChange={handleChange}
          required={false}
        />
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.consecutive
          }
          id='consecutive'
          isEmpty={isEmpty}
          label='Consecutivo'
          name='consecutive'
          placeholder='123'
          type='number'
          required={false}
        />
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.lastMade
          }
          id='lastMade'
          label='Último realizado'
          name='lastMade'
          placeholder=''
          type='string'
          disabled
        />
        {allProducts.length > 0 ? (
          <ComboBox
            data={allProducts}
            dataDisplayAttribute='name'
            defaultSelected={
              Object.keys(selectedRow).length === 0
                ? ''
                : selectedRow.product.name
            }
            id='product'
            label='Producto'
            name='product'
          />
        ) : (
          <div className='p-4'>
            <ChaoticOrbit size={35} color='#231F20' />
          </div>
        )}
        <button type='submit' className='btn'>
          Guardar
        </button>
      </form>
    </>
  )
}
