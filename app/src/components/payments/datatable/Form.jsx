import { useState } from 'react'

import { usePaymentsStore } from '@/stores/usePaymentsStore'

import { Input, ComboBox } from '@/components/form'
import {
  handleInputMinMaxValue,
  formatNumberToMoneyString
} from '@/utils/utils'

function AccountsPayableCombobox({
  accountsPayableData,
  handleAccountChange,
  selectedAccount,
  selectedRow
}) {
  return (
    <div className='grid w-full gap-6'>
      <ComboBox
        data={accountsPayableData}
        defaultSelected={
          Object.keys(selectedRow).length === 0
            ? ''
            : selectedRow.accountPayableFolio
        }
        dataDisplayAttribute='folio'
        id='accountPayable'
        label='Folio CxP'
        name='accountPayable'
        getSelected={handleAccountChange}
      />
      <div className='grid w-full grid-cols-2 gap-2 md:grid-cols-4'>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Folio de la Orden:</p>
          <p className='py-2 font-black'>{selectedAccount?.orderFolio}</p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Fecha de emision:</p>
          <p className='py-2 font-black'>
            {selectedAccount?.emitionDateFormatted}
          </p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Fecha de pago:</p>
          <p className='py-2 font-black'>
            {selectedAccount?.paymentDateFormatted}
          </p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Observaciones:</p>
          <p className='py-2 font-black'>{selectedAccount?.observations}</p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Cantidad:</p>
          <p className='py-2 font-black'>
            {formatNumberToMoneyString(selectedAccount?.quantity)}
          </p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Cantidad pagada:</p>
          <p className='py-2 font-black'>
            {formatNumberToMoneyString(selectedAccount?.quantityPaid)}
          </p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Saldo:</p>
          <p className='py-2 font-black'>
            {formatNumberToMoneyString(selectedAccount?.balance)}
          </p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Estado:</p>
          <p
            className={`py-2 font-black ${
              selectedAccount?.status?.toLowerCase() === 'pendiente'
                ? 'text-amber-500'
                : 'text-emerald-500'
            }`}
          >
            {selectedAccount?.status}
          </p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Proveedor:</p>
          <p className='py-2 font-black'>{`${selectedAccount?.supplier?.supplierCompany} (${selectedAccount?.supplier?.agent})`}</p>
        </span>
      </div>
    </div>
  )
}

/**
 *
 * @param {{selectedRow: object, submitAction: () => void, modalId: number, field: string}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function Form({ selectedRow, submitAction, modalId, field }) {
  const { accountsPayableData } = usePaymentsStore()
  const [selectedAccount, setSelectedAccount] = useState({})
  const [isEmpty, setIsEmpty] = useState(false)

  const handleAccountChange = (selected) => {
    setSelectedAccount(selected)
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

    const newIsEmpty = Object.values(data).some((x) => x === null)
    setIsEmpty(newIsEmpty)

    if (newIsEmpty) return

    const formatedData = {
      accountPayableId: data['accountPayable[id]'],
      accountPayableFolio: data['accountPayable[folio]'],
      // paymentDate: data.paymentDate,
      quantityPaid: data.quantityPaid,
      supplier: {
        supplierId: data['accountPayable[supplier][supplierId]'],
        supplierCompany: data['accountPayable[supplier][supplierCompany]'],
        agent: data['accountPayable[supplier][agent]']
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
              : new Date(selectedRow?.paymentDate).toISOString().split('T')[0]
          }
          id='paymentDate'
          isEmpty={isEmpty}
          label='Fecha de pago'
          name='paymentDate'
          type='date'
        />
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0
              ? ''
              : selectedRow.quantityPaid
          }
          id='quantityPaid'
          isEmpty={isEmpty}
          label='Cantidad Pagada'
          name='quantityPaid'
          placeholder='300'
          type='number'
          onChange={(e) =>
            handleInputMinMaxValue(e, 0, selectedAccount?.balance)
          }
        />
        <hr className='my-2 h-1 w-full bg-gray-600' />
        <AccountsPayableCombobox
          accountsPayableData={accountsPayableData}
          handleAccountChange={handleAccountChange}
          selectedAccount={selectedAccount}
          selectedRow={selectedRow}
        />
        <hr className='my-2 h-1 w-full bg-gray-600' />
        <button type='submit' className='btn self-end'>
          Guardar
        </button>
      </form>
    </>
  )
}
