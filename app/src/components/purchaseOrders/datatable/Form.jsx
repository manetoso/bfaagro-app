import { useState } from 'react'

import { usePurchaseOrdersStore } from '@/stores/usePurchaseOrdersStore'

import { Input, ComboBox, TextArea } from '@/components/form'
import { InfiniteInput } from './InfiniteInput'
import { PURCHASE_ORDERS_PERIODS } from '@/utils/consts'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const { suppliersData, productsData, companyData } = usePurchaseOrdersStore()
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
    const infiniteIva = []
    const infiniteSubtotal = []
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
      if (
        key.includes('infiniteInput') &&
        key.includes('iva') &&
        key.includes('name')
      ) {
        value === 'Si' ? infiniteIva.push(0.16) : infiniteIva.push(0)
      }
      if (key.includes('infiniteInput') && key.includes('subtotal')) {
        infiniteSubtotal.push(value)
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
        iva: infiniteIva[index],
        subtotal: Number(infiniteSubtotal[index]),
        totalUnit: Number(infiniteTotalUnit[index])
      })
    })

    const formatedData = {
      company: companyData.id,
      date: data.date,
      supplier: {
        supplierId: data['supplier[id]'],
        agent: data['supplier[agent]'],
        supplierCompany: data['supplier[name]']
      },
      products: formatedProducts,
      totalIva: data.totalIva,
      currency:
        data.currency === undefined
          ? 'MXN'
          : 'USD',
      total: data.total,
      // period: 3,
      period: data['period[value]'],
      observations: data.observations
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
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0
              ? new Date().toISOString().split('T')[0]
              : new Date(selectedRow?.date).toISOString().split('T')[0]
          }
          id='date'
          isEmpty={isEmpty}
          label='Fecha'
          name='date'
          type='date'
        />
        <ComboBox
          data={suppliersData}
          defaultSelected={
            Object.keys(selectedRow).length === 0
              ? ''
              : selectedRow.supplier.agent
          }
          dataDisplayAttribute='agent'
          id='supplier'
          isEmpty={isEmpty}
          label='Proveedor'
          name='supplier'
        />
        {Object.keys(selectedRow).length === 0 && (
          <>
            <ComboBox
              data={PURCHASE_ORDERS_PERIODS}
              dataDisplayAttribute='label'
              id='period'
              isEmpty={isEmpty}
              label='Periodo'
              name='period'
            />
            <TextArea
              id='observations'
              isEmpty={isEmpty}
              label='Observaciones'
              name='observations'
              placeholder='...'
            />
          </>
        )}
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0
              ? false
              : selectedRow?.currency === 'USD'
          }
          id='currency'
          label='Moneda en USD?'
          name='currency'
          required={false}
          type='checkbox'
        />
        <hr className='my-6 h-1 w-full bg-gray-600' />
        <InfiniteInput
          data={productsData}
          displayedData={selectedRow.products}
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
