import { useState } from 'react'

import { useSaleOrdersStore } from '@/stores/useSaleOrdersStore'

import { Input, ComboBox } from '@/components/form'
import { InfiniteInput } from './InfiniteInput'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const { clientsData, productsData, priceListData } = useSaleOrdersStore()
  const [isEmpty] = useState(false)

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

    // const newIsEmpty = Object.values(data).some((x) => x === null || x === '')
    // setIsEmpty(newIsEmpty)

    // if (newIsEmpty) return

    const comboId = []
    const comboName = []
    const comboUnity = []
    const infiniteQantity = []
    const infiniteUnitPrice = []
    const infiniteIncrement = []
    const infiniteTotalUnit = []
    const formatedProducts = []
    for (const [key, value] of formData.entries()) {
      if (
        key.includes('comboInfiniteInput') &&
        key.includes('id') &&
        !key.includes('productType') &&
        !key.includes('warehouse')
      ) {
        comboId.push(value)
      }
      if (
        key.includes('comboInfiniteInput') &&
        key.includes('name') &&
        !key.includes('productType') &&
        !key.includes('warehouse')
      ) {
        comboName.push(value)
      }
      if (key.includes('comboInfiniteInput') && key.includes('unity')) {
        comboUnity.push(value)
      }
      if (key.includes('infiniteInput') && key.includes('quantity')) {
        infiniteQantity.push(value)
      }
      if (key.includes('infiniteInput') && key.includes('unitPrice')) {
        infiniteUnitPrice.push(value)
      }
      if (key.includes('infiniteInput') && key.includes('increment')) {
        infiniteIncrement.push(value)
      }
      if (key.includes('infiniteInput') && key.includes('totalUnit')) {
        infiniteTotalUnit.push(value)
      }
    }
    comboId.forEach((id, index) => {
      formatedProducts.push({
        productId: id,
        name: comboName[index],
        unity: comboUnity[index],
        quantity: Number(infiniteQantity[index]),
        unitPrice: Number(infiniteUnitPrice[index]),
        increment: Number(infiniteIncrement[index]),
        totalUnit: Number(infiniteTotalUnit[index])
      })
    })

    const formatedData = {
      endDate: data.date,
      period: data.period,
      products: formatedProducts,
      originClient: {
        clientId: window.location.pathname.includes('bfa')
          ? null
          : data['originClient[id]'],
        clientName: window.location.pathname.includes('bfa')
          ? 'BFA AGRO S.A de C.V'
          : data['originClient[name]']
      },
      destinationClient: {
        clientId: data['client[id]'],
        clientName: data['client[name]']
      },
      total: data.total,
      totalPaid: data.totalPaid,
      balance: data.balance
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
        {window.location.pathname.includes('comisionistas') && (
          <ComboBox
            data={clientsData}
            defaultSelected={
              Object.keys(selectedRow).length === 0
                ? null
                : selectedRow.originClient.clientName
            }
            dataDisplayAttribute='name'
            id='originClient'
            isEmpty={isEmpty}
            label='Cliente de origen'
            name='originClient'
          />
        )}
        <ComboBox
          data={clientsData}
          defaultSelected={
            Object.keys(selectedRow).length === 0
              ? null
              : selectedRow.destinationClient.clientName
          }
          dataDisplayAttribute='name'
          id='client'
          isEmpty={isEmpty}
          label='Cliente de destino'
          name='client'
        />
        <Input
          defaultValue={new Date().toISOString().split('T')[0]}
          id='date'
          isEmpty={isEmpty}
          label='Fecha de Vencimiento'
          name='date'
          type='date'
        />
        {Object.keys(selectedRow).length === 0 && (
          <>
            <Input
              id='period'
              placeholder='0'
              isEmpty={isEmpty}
              label='Periodo (días)'
              name='period'
              defaultValue={0}
              type='number'
            />
          </>
        )}
        <hr className='my-6 h-1 w-full bg-gray-600' />
        <InfiniteInput
          data={productsData}
          displayedData={selectedRow.saleDetails?.products}
          priceListData={priceListData}
          isEditing={Object.keys(selectedRow).length !== 0}
          placeholder='Producto'
        />
        <hr className='mb-6 h-1 w-full bg-gray-600' />
        <button type='submit' className='btn self-end'>
          Guardar
        </button>
      </form>
    </>
  )
}
