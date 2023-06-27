import { useState } from 'react'

import { usePurchaseOrdersStore } from '@/stores/usePurchaseOrdersStore'

import { Input, ComboBox } from '@/components/form'
import { InfiniteInput } from './InfiniteInput'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const { suppliersData, productsData, companyData } = usePurchaseOrdersStore()
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

    const comboId = []
    const comboName = []
    const comboUnity = []
    const infiniteQantity = []
    const infiniteUnitPrice = []
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
      iva: data.iva,
      total: data.total
    }

    // console.log({ formatedData });
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
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.iva
          }
          id='iva'
          isEmpty={isEmpty}
          label='IVA'
          name='iva'
          placeholder='300'
          type='number'
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
