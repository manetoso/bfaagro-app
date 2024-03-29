import { useState } from 'react'
import toast from 'react-hot-toast'

import { useWareHouseDatatable } from '@/hooks/useWareHouseDatatable'
import { useWarehouseStore, FIELDS_TYPES } from '@/stores/useWarehouseStore'
import { productReceipt } from '@/services/warehouseServices'

import { CustomToast } from '@/components/toast'
import { ConfirmationAlert } from '@/components/alert/ConfirmationAlert'
import { ComboBox } from '@/components/form'
import { Loader } from '@/components/layout'

import { InfiniteInput } from '../formulation/datatable/InfiniteInput'

export function Receipt() {
  const { movementTypes } = useWarehouseStore()
  const { allProducts } = useWareHouseDatatable({ field: FIELDS_TYPES.ALL })
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false)
  const [receiptData, setReceiptData] = useState()

  const togglCconfirmModalIsOpen = () => {
    setConfirmModalIsOpen(!confirmModalIsOpen)
  }

  const handleConfirm = () => {
    togglCconfirmModalIsOpen()
    productReceipt(receiptData)
  }

  const handleCancel = () => {
    togglCconfirmModalIsOpen()
    toast.success('Registro de productos cancelado')
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

    const selectedProductsId = []
    const selectedProductsName = []
    const selectedProductsQuantity = []
    const result = []
    // SEARCHING FOR THE SELECTED PRODUCTS
    for (const [key, value] of formData.entries()) {
      // IF THE KEY HAS MORE THAN 3 BRACKETS, IT MEANS THAT THE DATA ISN'T RELEVANT
      if (key.split('[').length > 3) {
        continue
      }
      // IF THE KEY HAS THE WORDS 'product' AND 'id', IT MEANS THAT THE VALUE IS THE ID OF THE PRODUCT
      if (key.includes('product') && key.includes('id')) {
        selectedProductsId.push(value)
      }
      // IF THE KEY HAS THE WORDS 'product' AND 'name', IT MEANS THAT THE VALUE IS THE NAME OF THE PRODUCT
      if (key.includes('product') && key.includes('name')) {
        selectedProductsName.push(value)
      }
      // IF THE KEY HAS THE WORDS 'selectedQuantity', IT MEANS THAT THE VALUE IS THE QUANTITY OF THE PRODUCT
      if (key.includes('selectedQuantity')) {
        selectedProductsQuantity.push(Number(value))
      }
    }
    // CREATING THE RESULT ARRAY
    selectedProductsId.forEach((id, index) => {
      result.push({
        productId: id,
        productName: selectedProductsName[index],
        productQuantity: selectedProductsQuantity[index]
      })
    })

    const formatedData = {
      movementType: {
        movementTypeId: data['movementType[id]'],
        value: data['movementType[value]']
      },
      products: result
    }

    // console.log({ formatedData })
    togglCconfirmModalIsOpen()
    setReceiptData(formatedData)
  }
  return (
    <>
      <CustomToast />
      <ConfirmationAlert
        cancel={handleCancel}
        confirm={handleConfirm}
        confirmText='Registrar'
        message='¿Seguro que quieres registrar los productos indicados?'
        title='Registrar Mercancía'
        isOpen={confirmModalIsOpen}
      />
      <div className='mt-4 flex flex-col gap-2'>
        <h3 className='text-xl font-black'>
          Recibo de Mercancía{' '}
          <small className='text-xs font-bold text-gray-400'>
            Registra nueva mercacia en los almacenes
          </small>
        </h3>
        <form className='min-h-[50vh]' onSubmit={handleSubmit}>
          {allProducts.length > 0 ? (
            <div className='flex flex-1 flex-col gap-2'>
              <ComboBox
                data={movementTypes}
                dataDisplayAttribute='value'
                label='Tipo de Movimiento'
                id='movementType'
                name='movementType'
              />
              <label className='font-bold text-gray-600'>Productos</label>
              <InfiniteInput
                data={allProducts}
                placeholder='Cantidad'
                fisrtInputName='product'
                secondInputName='selectedQuantity'
              />
              <button type='submit' className='btn mt-2'>
                Registrar Productos
              </button>
            </div>
          ) : (
            <Loader />
          )}
        </form>
      </div>
    </>
  )
}
