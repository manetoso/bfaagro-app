import { Fragment, useState } from 'react'

import { ComboBox } from '@/components/form/ComboBox'
import { Input } from '@/components/form/Input'

import { formatNumberToMoneyString } from '@/utils/utils'

import { Plus, Close } from '🚀'

export function InfiniteInput({
  data = [],
  displayedData = [],
  comboInputName = 'comboInfiniteInput',
  placeholder = '-',
  inputName = 'infiniteInput'
}) {
  const labels = ['Producto', 'Cantidad', 'Precio Unitario', 'Total Unitario']
  const inputNames = ['name', 'quantity', 'unitPrice', 'totalUnit']
  const [inputList, setInputList] = useState(
    displayedData.length > 0
      ? displayedData.map((x, i) => ({
          id: i + 1,
          inputs: [
            { id: 1, value: x.name },
            { id: 2, value: x.quantity },
            { id: 3, value: x.unitPrice },
            { id: 4, value: x.totalUnit }
          ]
        }))
      : [
          {
            id: 1,
            inputs: [
              { id: 1, value: '' },
              { id: 2, value: '' },
              { id: 3, value: '' },
              { id: 4, value: '' }
            ]
          }
        ]
  )
  return (
    <div className='flex w-full flex-col items-end gap-2'>
      {inputList.map((x, i) => {
        return (
          <div key={x.id} className='flex w-full flex-col items-end gap-2'>
            <div className='flex w-full items-start gap-1'>
              <div className='grid w-full grid-cols-2 gap-1 md:grid-cols-4'>
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
                          onChange={(e) => {
                            const list = [...inputList]
                            list[i].inputs[j].value = e.target.value
                            setInputList(list)
                          }}
                        />
                      </div>
                    )
                  } else {
                    return j !== 3 ? (
                      <Input
                        key={y.id}
                        id={`${inputName}[${i}][${inputNames[j]}]`}
                        name={`${inputName}[${i}][${inputNames[j]}]`}
                        label={`${labels[j]}`}
                        required={false}
                        placeholder={placeholder}
                        defaultValue={y.value}
                        onChange={(e) => {
                          if (e.target.value < 0) {
                            e.target.value = 0
                            return
                          }
                          const list = [...inputList]
                          list[i].inputs[j].value = e.target.value

                          list[i].inputs[3].value =
                            list[i].inputs[2].value * list[i].inputs[1].value

                          setInputList(list)
                        }}
                      />
                    ) : (
                      <Fragment key={y.id}>
                        <input
                          type='number'
                          value={inputList[i].inputs[3].value}
                          onChange={(e) => {}}
                          name={`${inputName}[${i}][${inputNames[3]}]`}
                          className='hidden'
                        />
                        <span className='flex flex-col text-gray-600'>
                          <p className='font-bold'>Total Unitario:</p>
                          <p className='p-2 font-black'>
                            {formatNumberToMoneyString(
                              inputList[i].inputs[2].value *
                                inputList[i].inputs[1].value
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
                    setInputList(inputList.filter((s, j) => i !== j))
                  }
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
                        { id: 2, value: '' },
                        { id: 3, value: '' },
                        { id: 4, value: '' }
                      ]
                    }
                  ])
                }
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
              return acc + Number(curr.inputs[3].value)
            }, 0)
          )}
        </p>
      </span>
      <input
        type='number'
        name='total'
        readOnly
        value={inputList.reduce((acc, curr) => {
          return acc + Number(curr.inputs[3].value)
        }, 0)}
        className='hidden'
      />
    </div>
  )
}
