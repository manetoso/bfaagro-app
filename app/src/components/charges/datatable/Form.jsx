import { useState } from 'react'

import { useChargesStore } from '@/stores/useChargesStore'

import { Input, TextArea, ComboBox } from '@/components/form'
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
          Object.keys(selectedRow).length === 0 ? '' : selectedRow.folio
        }
        dataDisplayAttribute='folio'
        id='accountReceivable'
        label='Folio CxC'
        name='accountReceivable'
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
          <p className='font-bold'>Fecha de vencimiento:</p>
          <p className='py-2 font-black'>
            {selectedAccount?.expirationDateFormatted}
          </p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Observaciones:</p>
          <p className='py-2 font-black'>{selectedAccount?.observations}</p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Cantidad:</p>
          <p className='py-2 font-black'>
            {formatNumberToMoneyString(selectedAccount?.totalSale)}
          </p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Cantidad pagada:</p>
          <p className='py-2 font-black'>
            {formatNumberToMoneyString(selectedAccount?.totalPaid)}
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
          <p className='font-bold'>Cliente Origen:</p>
          <p className='py-2 font-black'>
            {selectedAccount?.clients?.originClient.clientName}
          </p>
        </span>
        <span className='flex flex-col text-gray-600'>
          <p className='font-bold'>Cliente Destino:</p>
          <p className='py-2 font-black'>
            {selectedAccount?.clients?.destinationClient.clientName}
          </p>
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
  const { accountsReceivableData } = useChargesStore()
  const [selectedAccount, setSelectedAccount] = useState({})
  const [observations, setObservations] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)

  const handleAccountChange = (selected) => {
    setSelectedAccount(selected)
    setObservations(selected.observations)
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
    delete data['accountReceivable[observations]']

    const newIsEmpty = Object.values(data).some((x) => x === null)
    setIsEmpty(newIsEmpty)

    if (newIsEmpty) return

    const formatedData = {
      accountReceivableId: data['accountReceivable[id]'],
      accountReceivableFolio: data['accountReceivable[folio]'],
      saleOrderId: data['accountReceivable[saleOrderId]'],
      quantityCharged: data.quantityCharged,
      observations: data.observations,
      client: {
        clientId:
          data['accountReceivable[clients][destinationClient][clientId]'],
        clientName:
          data['accountReceivable[clients][destinationClient][clientName]']
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
              : new Date(selectedRow?.chargeDate).toISOString().split('T')[0]
          }
          id='chargeDate'
          isEmpty={isEmpty}
          label='Fecha de cobro'
          name='chargeDate'
          type='date'
        />
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0
              ? ''
              : selectedRow.quantityCharged
          }
          id='quantityCharged'
          isEmpty={isEmpty}
          label='Cantidad cobrada'
          name='quantityCharged'
          placeholder='300'
          type='number'
          onChange={(e) =>
            handleInputMinMaxValue(e, 0, selectedAccount?.balance)
          }
        />
        <TextArea
          id='observations'
          isEmpty={isEmpty}
          label='Observaciones'
          name='observations'
          placeholder='Pagó la cantidad de 300'
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />
        <hr className='my-2 h-1 w-full bg-gray-600' />
        <AccountsPayableCombobox
          accountsPayableData={accountsReceivableData}
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
