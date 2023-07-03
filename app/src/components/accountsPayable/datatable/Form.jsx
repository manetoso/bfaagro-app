import { useState } from 'react'

import { useAccountsPayableStore } from '@/stores/useAccountsPayableStore'

import { Input, ComboBox, TextArea } from '@/components/form'

import {
  formatNumberToMoneyString,
  handleInputMinMaxValue
} from '@/utils/utils'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const { suppliersData } = useAccountsPayableStore()
  const [isEmpty, setIsEmpty] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState({})
  const [calculatedBalance, setCalculatedBalance] = useState(
    selectedRow.quantity - selectedRow.quantityPaid
  )

  const handleSupplierChange = (selected) => {
    setSelectedSupplier(selected)
  }
  const handleQuantityPaidChange = (event) => {
    handleInputMinMaxValue(event, 0, selectedRow.quantity)
    setCalculatedBalance(selectedRow.quantity - event.target.value)
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

    const formatedData = {
      folio: selectedRow.folio,
      orderFolio: selectedRow.orderFolio,
      purchaseOrderId: selectedRow.purchaseOrderId,
      emitionDate: data.emitionDate,
      paymentDate: data.paymentDate,
      quantity: data.quantity,
      quantityPaid: data.quantityPaid,
      balance: calculatedBalance,
      observations: data.observations,
      status: calculatedBalance === 0 ? 'Pagado' : 'Pendiente',
      supplier: {
        supplierId: selectedSupplier.id,
        agent: selectedSupplier.agent,
        supplierCompany: selectedSupplier.name
      }
    }

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
              : new Date(selectedRow?.emitionDate).toISOString().split('T')[0]
          }
          id='emitionDate'
          isEmpty={isEmpty}
          label='Fecha de emisión'
          name='emitionDate'
          type='date'
        />
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0
              ? new Date().toISOString().split('T')[0]
              : new Date(selectedRow?.paymentDate).toISOString().split('T')[0]
          }
          id='paymentDate'
          isEmpty={isEmpty}
          label='Fecha de pago'
          name='paymentDate'
          type='date'
        />
        <div className='grid w-full grid-cols-2 gap-2'>
          <ComboBox
            data={suppliersData}
            defaultSelected={
              Object.keys(selectedRow).length === 0
                ? ''
                : selectedRow.supplier.agent
            }
            dataDisplayAttribute='agent'
            id='supplierAgent'
            isEmpty={isEmpty}
            label='Proveedor'
            name='supplierAgent'
            getSelected={handleSupplierChange}
          />
          <span className='flex flex-col text-gray-600'>
            <p className='font-bold'>Empresa:</p>
            <p className='p-2 font-black'>{selectedSupplier.name}</p>
          </span>
        </div>
        <div className='grid w-full grid-cols-2 gap-2 md:grid-cols-3'>
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0 ? '' : selectedRow.quantity
            }
            id='quantity'
            isEmpty={isEmpty}
            label='Cantidad'
            name='quantity'
            placeholder='300'
            readOnly
            type='number'
          />
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0
                ? ''
                : selectedRow.quantityPaid
            }
            id='quantityPaid'
            isEmpty={isEmpty}
            label='Cantidad pagada'
            name='quantityPaid'
            placeholder='300'
            type='number'
            onChange={handleQuantityPaidChange}
          />
          <span className='flex flex-col text-gray-600'>
            <p className='font-bold'>Saldo:</p>
            <p className='p-2 font-black'>
              {formatNumberToMoneyString(calculatedBalance)}
            </p>
          </span>
        </div>
        <TextArea
          defaultValue={
            Object.keys(selectedRow).length === 0
              ? ''
              : selectedRow.observations
          }
          id='observations'
          isEmpty={isEmpty}
          label='Observaciones'
          name='observations'
          placeholder='...'
        />
        <button type='submit' className='btn self-end'>
          Guardar
        </button>
      </form>
    </>
  )
}
