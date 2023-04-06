import { useState } from 'react'

import { useWarehouseStore } from '@/stores'
import { ComboBox } from '@/components/form/ComboBox'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string, warehouse: string, productType: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({
  selectedRow,
  submitAction,
  field,
  warehouse,
  productType
}) {
  const [isEmpty, setIsEmpty] = useState(false)
  // SETTING THE DEFAULT VALUE FOR THE PRODUCT TYPE ( THE WAREHOHSE'S PRODUCT TYPE )
  let firstProductType = productType.id
  // CHECKING IF THE ROW HAS MORE THAN ONE PRODUCT TYPE
  const [secondTypeCheck, setSecondTypeCheck] = useState(selectedRow.productType?.length > 1 ? true : false)
  const { productTypes } = useWarehouseStore()

  if (selectedRow.productType?.length > 0) {
    // OBTAINING THE VALUE OF THE FIRST PRODUCT TYPE ( IN CASE OF EDITING A ROW )
    firstProductType = productTypes.find((x) => x.value.productType === selectedRow.productType[0].name).id
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

    // CHECKING IF THE SECOND PRODUCT TYPE IS CHECKED
    if (data['productType[id]']) {
      data.idProductType2 = data['productType[id]']
      delete data['productType[id]']
      delete data['productType[productType]']
      delete data['productType[value]']
    }
    submitAction(data, field)
  }
  return (
    <>
      <form
        className='mx-auto mt-4 flex max-w-xs flex-col items-center gap-2'
        onSubmit={handleSubmit}
      >
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
          type='text'
          name='idProductType'
          defaultValue={firstProductType}
          placeholder='Tipo de Producto'
          hidden
        />
        <input
          className={`input w-full ${isEmpty && 'border-rose-500'}`}
          type='text'
          name='idWarehouse'
          defaultValue={warehouse.id}
          placeholder='Almacén'
          hidden
        />
        <span className='flex w-full items-center gap-2'>
          <label htmlFor='secondType'>Agregar un segundo tipo?</label>
          <input
            id='secondType'
            type='checkbox'
            onChange={() => setSecondTypeCheck(!secondTypeCheck)}
            checked={secondTypeCheck}
          />
        </span>
        {secondTypeCheck && (
          <ComboBox
            data={[
              ...productTypes.map((x) => ({
                id: x.id,
                productType: x.value.productType,
                value: x.value.id
              }))
            ]}
            dataDisplayAttribute='productType'
            name='productType'
            defaultSelected={selectedRow.productType && selectedRow.productType[1].name}
          />
        )}
        <button type='submit' className='btn'>
          Guardar
        </button>
      </form>
    </>
  )
}
