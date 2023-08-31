import { useEffect, useState } from 'react'

import { usePriceListStore } from '@/stores/usePriceListStore'

import { Input, ComboBox } from '@/components/form'

function RiseInputs({ selectedRow, isEmpty, unitPrice }) {
  const [percentage, setPercentage] = useState(
    selectedRow?.rise?.risePercentage || 0
  )
  const [quantity, setQuantity] = useState(selectedRow?.rise?.riseQuantity || 0)
  const [finalPrice, setFinalPrice] = useState(selectedRow?.finalPrice || 0)

  const handleInputMinMaxValue = (event, minValue, maxValue) => {
    if (event.target.value > maxValue) {
      event.target.value = maxValue
    }
    if (event.target.value < minValue) {
      event.target.value = minValue
    }
    return event.target.value
  }

  const handlePercentage = (e) => {
    const value = handleInputMinMaxValue(e, 0, 100)
    setPercentage(value)
    setQuantity(((selectedRow.unitPrice || unitPrice) * value) / 100)
  }
  const handleQuantity = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0
    }
    const value = e.target.value
    setQuantity(value)
    const newPercentage = (value * 100) / (selectedRow.unitPrice || unitPrice)
    setPercentage(newPercentage.toFixed(2))
  }

  useEffect(() => {
    setFinalPrice(Number(unitPrice) + Number(quantity))
  }, [quantity, unitPrice])
  return (
    <div className='flex w-full flex-col gap-2'>
      <h3 className='text-lg font-black leading-3'>Aumento</h3>
      <Input
        value={percentage}
        id='percentage'
        isEmpty={isEmpty}
        label='Porcentaje'
        name='percentage'
        placeholder='10'
        type='number'
        required={false}
        onChange={handlePercentage}
      />
      <Input
        value={quantity}
        id='quantity'
        isEmpty={isEmpty}
        label='Cantidad'
        name='quantity'
        placeholder='300'
        type='number'
        required={false}
        onChange={handleQuantity}
      />
      <input
        className='hidden'
        type='number'
        name='finalPrice'
        readOnly
        value={finalPrice}
      />
      <span className='self-end text-2xl font-black'>Total: {finalPrice}</span>
    </div>
  )
}

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const { productsData, priceListTypesData } = usePriceListStore()
  const [isEmpty, setIsEmpty] = useState(false)
  const [unitPrice, setUnitPrice] = useState(selectedRow?.unitPrice || 0)

  const handleUnitPrice = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0
    }
    const value = e.target.value
    setUnitPrice(Number(value))
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

    const priceListType = priceListTypesData[0]
    const formatedData = {
      rise: {
        risePercentage: data.percentage,
        riseQuantity: data.quantity
      },
      priceListType: {
        priceListId: priceListType.id,
        priceListName: priceListType.value
      },
      unitPrice,
      finalPrice: data.finalPrice,
      productId: data['product[id]'],
      productName: data['product[name]']
    }

    // console.log({ data })
    // console.log({ formatedData })
    submitAction(formatedData, field)
  }

  return (
    <>
      <form
        className='mx-auto mt-4 flex flex-col items-center gap-2'
        onSubmit={handleSubmit}
      >
        <ComboBox
          data={productsData}
          defaultSelected={
            Object.keys(selectedRow).length === 0
              ? ''
              : selectedRow.productName
          }
          dataDisplayAttribute='name'
          id='product'
          label='Producto'
          name='product'
        />
        <Input
          value={unitPrice}
          id='unitPrice'
          isEmpty={isEmpty}
          label='Precio unitario'
          name='unitPrice'
          placeholder='300'
          type='number'
          required={false}
          onChange={handleUnitPrice}
        />
        <hr className='my-2 h-1 w-full bg-gray-600' />
        <RiseInputs
          selectedRow={selectedRow}
          isEmpty={isEmpty}
          unitPrice={unitPrice}
        />
        <hr className='my-2 h-1 w-full bg-gray-600' />
        <button type='submit' className='btn self-end'>
          Guardar
        </button>
      </form>
    </>
  )
}
