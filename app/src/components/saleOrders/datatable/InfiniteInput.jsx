import { Fragment, useEffect, useState } from 'react'

import { ComboBox } from '@/components/form/ComboBox'
import { Input } from '@/components/form/Input'

import { formatNumberToMoneyString } from '@/utils/utils'

import { Plus, Close } from '🚀'

export function InfiniteInput({
  data = [],
  displayedData = [],
  priceListData = [],
  comboInputName = 'comboInfiniteInput',
  placeholder = '-',
  inputName = 'infiniteInput',
  isEditing = false
}) {
  const labels = ['Producto', 'Cantidad', 'Precio Unitario', 'Descuento (%)', 'Total Unitario']
  const inputNames = ['name', 'quantity', 'unitPrice', 'increment', 'totalUnit']
  const [total, setTotal] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [balance, setBalance] = useState(0)
  const [inputList, setInputList] = useState(
    displayedData.length > 0
      ? displayedData.map((x, i) => ({
        id: i + 1,
        inputs: [
          { id: 1, value: x.name },
          { id: 2, value: x.quantity },
          { id: 3, value: x.unitPrice },
          { id: 4, value: x.increment || 0 },
          {
            id: 5,
            value:
              x.quantity * x.unitPrice -
              (x.quantity * x.unitPrice * x.increment) / 100
          }
        ]
      }))
      : [
          {
            id: 1,
            inputs: [
              { id: 1, value: data[0].name },
              { id: 2, value: 0 },
              { id: 3, value: 0 },
              { id: 4, value: 0 },
              { id: 5, value: '' }
            ]
          }
        ]
  )
  useEffect(() => {
    setTotal(
      inputList.reduce((acc, curr) => {
        return acc + Number(curr.inputs[4].value)
      }, 0)
    )
  }, [inputList])
  useEffect(() => {
    setBalance(total - subtotal)
  }, [total, subtotal])

  return (
    <div className='flex w-full flex-col items-end gap-2'>
      {inputList.map((x, i) => {
        return (
          <div key={x.id} className='flex w-full flex-col items-end gap-2'>
            <div className='flex w-full items-start gap-1'>
              <div className='grid w-full grid-cols-3 gap-1'>
                {x.inputs.map((y, j) => {
                  if (y.id === 1) {
                    return (
                      <div key={y.id} className='flex flex-col'>
                        <label className='font-bold text-gray-600'>
                          {labels[0]}
                        </label>
                        <ComboBox
                          data={data}
                          dataDisplayAttribute='name'
                          defaultSelected={displayedData[i]?.name}
                          name={`${comboInputName}[${i}]`}
                          getSelected={(selected) => {
                            const list = [...inputList]
                            list[i].inputs[j].value = selected.name
                            list[i].inputs[2].value = priceListData.filter((price) => price.productName === inputList[i].inputs[0].value)[0].finalPrice
                            setInputList(list)
                          }}
                        />
                      </div>
                    )
                  } else {
                    return j === 1 ? (
                      <Input
                        key={y.id}
                        id={`${inputName}[${i}][${inputNames[j]}]`}
                        name={`${inputName}[${i}][${inputNames[j]}]`}
                        label={`${labels[j]}`}
                        required={false}
                        placeholder={placeholder}
                        defaultValue={y.value}
                        type='number'
                        onChange={(e) => {
                          if (e.target.value < 0) {
                            e.target.value = 0
                            return
                          }
                          const list = [...inputList]
                          list[i].inputs[j].value = Number(e.target.value)

                          list[i].inputs[4].value =
                            list[i].inputs[2].value * list[i].inputs[1].value

                          setInputList(list)
                        }}
                      />
                    ) : j === 2 ? (
                      <Fragment key={y.id}>
                        <input
                          type='number'
                          value={inputList[i].inputs[2].value}
                          name={`${inputName}[${i}][${inputNames[2]}]`}
                          className='hidden'
                          readOnly
                        />
                        <span className='flex flex-col text-gray-600'>
                          <p className='font-bold'>Precio Unitario:</p>
                          <p className='p-2 font-black'>
                            {formatNumberToMoneyString(
                              inputList[i].inputs[2].value
                            )}
                          </p>
                        </span>
                      </Fragment>
                    ) : j === 3 ? (
                      <Input
                        key={y.id}
                        id={`${inputName}[${i}][${inputNames[j]}]`}
                        name={`${inputName}[${i}][${inputNames[j]}]`}
                        label={`${labels[j]}`}
                        required={false}
                        placeholder={placeholder}
                        defaultValue={y.value}
                        type='number'
                        onChange={(e) => {
                          const list = [...inputList]
                          const percentaje = Number(e.target.value)
                          list[i].inputs[j].value = percentaje

                          const price = list[i].inputs[2].value * list[i].inputs[1].value
                          list[i].inputs[4].value = (price) - (price * percentaje) / 100

                          setInputList(list)
                        }}
                      />
                    ) : (
                      <Fragment key={y.id}>
                        <input
                          type='number'
                          value={inputList[i].inputs[j].value}
                          name={`${inputName}[${i}][${inputNames[j]}]`}
                          className='hidden'
                          readOnly
                        />
                        <span className='flex flex-col text-gray-600'>
                          <p className='font-bold'>{labels[j]}:</p>
                          <p className='p-2 font-black'>
                            {formatNumberToMoneyString(
                              (inputList[i].inputs[2].value * inputList[i].inputs[1].value) - ((inputList[i].inputs[2].value * inputList[i].inputs[1].value) * inputList[i].inputs[3].value) / 100
                            )}
                          </p>
                        </span>
                      </Fragment>
                    )
                  }
                })}
              </div>
              {inputList.length !== 1 && (
                <button
                  type='button'
                  className='btn bg-rose-500 p-2 text-white hover:bg-rose-600'
                  onClick={() =>
                    setInputList(inputList.filter((s, j) => i !== j))}
                >
                  <Close />
                </button>
              )}
            </div>
            {inputList.length - 1 === i && (
              <button
                className='btn p-2'
                type='button'
                onClick={() =>
                  setInputList([
                    ...inputList,
                    {
                      id: i + 2,
                      inputs: [
                        { id: 1, value: '' },
                        { id: 2, value: 0 },
                        { id: 3, value: 0 },
                        { id: 4, value: 0 },
                        { id: 5, value: '' }
                      ]
                    }
                  ])}
              >
                <Plus />
              </button>
            )}
          </div>
        )
      })}
      <span className='flex gap-2 text-2xl'>
        <p className='font-bold'>Total:</p>
        <p className='font-black'>
          {formatNumberToMoneyString(
            inputList.reduce((acc, curr) => {
              return acc + Number(curr.inputs[4].value)
            }, 0)
          )}
        </p>
      </span>
      <input
        type='number'
        name='total'
        readOnly
        value={total}
        className='hidden'
      />
      {!isEditing && (
        <>
          <input
            type='number'
            name='totalPaid'
            readOnly
            value={subtotal}
            onChange={(e) => {
              if (e.target.value < 0) {
                e.target.value = 0
                setSubtotal(0)
                return
              }
              if (e.target.value > total) {
                e.target.value = total
                setSubtotal(total)
              }
              setSubtotal(e.target.value)
            }}
            className='hidden'
          />
          <input
            type='number'
            name='balance'
            readOnly
            value={balance}
            className='hidden'
          />
        </>
      )}
    </div>
  )
}
