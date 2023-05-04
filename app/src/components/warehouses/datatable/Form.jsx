import { useState } from 'react'

import { useWarehouseStore } from '@/stores'
import { ComboBox, Input } from '@/components/form'

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
  const [secondTypeCheck, setSecondTypeCheck] = useState(
    selectedRow.productType?.length > 1 ? true : false
  )
  const { productTypes, unityTypes } = useWarehouseStore()

  if (selectedRow.productType?.length > 0) {
    // OBTAINING THE VALUE OF THE FIRST PRODUCT TYPE ( IN CASE OF EDITING A ROW )
    firstProductType = productTypes.find(
      (x) => x.value.productType === selectedRow.productType[0].name
    ).id
  }

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

    // CHECKING IF THERE ARE EMPTY FIELDS
    const newIsEmpty = Object.values(data).some((x) => x === null || x === '')
    setIsEmpty(newIsEmpty)
    if (newIsEmpty) return

    data.unity = data['unity[unityType]']
    delete data['unity[id]']
    delete data['unity[unityType]']

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
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.quantity
          }
          id='quantity'
          isEmpty={isEmpty}
          label='Cantidad'
          name='quantity'
          onChange={(e) => handleMinMaxValue(e, 0, 999999999)}
          placeholder='30'
          type='number'
        />
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.minQuantity
          }
          id='minQuantity'
          isEmpty={isEmpty}
          label='Cantidad Mínima'
          name='minQuantity'
          onChange={(e) => handleMinMaxValue(e, 0, 999999999)}
          placeholder='10'
          type='number'
        />
        <ComboBox
          id='unityType'
          label='Unidad de Medida'
          data={unityTypes}
          dataDisplayAttribute='unityType'
          name='unity'
          defaultSelected={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.unity
          }
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
            defaultSelected={
              selectedRow.productType && selectedRow.productType[1].name
            }
          />
        )}
        <button type='submit' className='btn'>
          Guardar
        </button>
      </form>
    </>
  )
}
