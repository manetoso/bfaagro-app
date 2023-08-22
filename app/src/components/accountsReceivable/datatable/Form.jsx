import { useState } from 'react'

import { Input, TextArea } from '@/components/form'

import {
  formatNumberToMoneyString,
  handleInputMinMaxValue
} from '@/utils/utils'
import { ACCOUNTS_RECEIVABLE_STATUS } from '@/utils/consts'

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const [isEmpty] = useState(false)
  const [calculatedBalance, setCalculatedBalance] = useState(
    selectedRow.totalSale - selectedRow.totalPaid
  )
  const handleQuantityPaidChange = (event) => {
    handleInputMinMaxValue(event, 0, selectedRow.totalSale)
    setCalculatedBalance(selectedRow.totalSale - event.target.value)
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

    const formatedData = {
      folio: selectedRow.folio,
      orderFolio: selectedRow.orderFolio,
      saleOrderId: selectedRow.saleOrderId,
      emitionDate: data.emitionDate,
      expirationDate: data.expirationDate,
      totalSale: data.totalSale,
      totalPaid: data.totalPaid,
      balance: calculatedBalance,
      observations: data.observations,
      status: calculatedBalance === 0 ? ACCOUNTS_RECEIVABLE_STATUS.PAID : ACCOUNTS_RECEIVABLE_STATUS.PENDING
    }

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
              : new Date(selectedRow?.expirationDate)
                .toISOString()
                .split('T')[0]
          }
          id='expirationDate'
          isEmpty={isEmpty}
          label='Fecha de vencimiento'
          name='expirationDate'
          type='date'
        />
        <div className='grid w-full grid-cols-2 gap-2 md:grid-cols-3'>
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0 ? '' : selectedRow.totalSale
            }
            id='totalSale'
            isEmpty={isEmpty}
            label='Cantidad'
            name='totalSale'
            placeholder='300'
            readOnly
            type='number'
          />
          <Input
            defaultValue={
              Object.keys(selectedRow).length === 0 ? '' : selectedRow.totalPaid
            }
            id='totalPaid'
            isEmpty={isEmpty}
            label='Cantidad pagada'
            name='totalPaid'
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
