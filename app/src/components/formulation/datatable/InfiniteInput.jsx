import { ComboBox } from '@/components/form/ComboBox'
import { useState } from 'react'

import { Plus, Close } from '🚀'

export function InfiniteInput({
  data = [],
  rawMaterials = [],
  fisrtInputName = 'firstInfiniteInput',
  placeholder = '-',
  secondInputName = 'secondInfiniteInput'
}) {
  const [inputList, setInputList] = useState(
    rawMaterials.length > 0
      ? rawMaterials.map((x, i) => ({
          id: i + 1,
          inputs: [
            { id: 1, value: x.name },
            { id: 2, value: x.quantity }
          ]
        }))
      : [
          {
            id: 1,
            inputs: [
              { id: 1, value: '' },
              { id: 2, value: '' }
            ]
          }
        ]
  )
  return (
    <>
      {inputList.map((x, i) => {
        return (
          <div key={x.id} className='flex flex-col items-end gap-2'>
            <div className='flex w-full items-center gap-1'>
              {x.inputs.map((y, j) => {
                if (y.id === 1) {
                  return (
                    <ComboBox
                      key={y.id}
                      data={data}
                      dataDisplayAttribute='name'
                      defaultSelected={rawMaterials[i]?.name}
                      name={`${fisrtInputName}[${i}]`}
                      onChange={(e) => {
                        const list = [...inputList]
                        list[i].inputs[j].value = e.target.value
                        setInputList(list)
                      }}
                    />
                  )
                } else {
                  return (
                    <input
                      key={y.id}
                      className='input w-full max-w-none'
                      name={`${secondInputName}[${i}]`}
                      placeholder={placeholder}
                      value={y.value}
                      onChange={(e) => {
                        const list = [...inputList]
                        list[i].inputs[j].value = e.target.value
                        setInputList(list)
                      }}
                    />
                  )
                }
              })}
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
                        { id: 2, value: '' }
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
    </>
  )
}
