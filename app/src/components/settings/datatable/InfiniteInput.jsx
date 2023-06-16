import { ComboBox } from '@/components/form/ComboBox'
import { useState } from 'react'

import { Plus, Close } from '🚀'

export function InfiniteInput({
  data = [],
  displayedData = [],
  inputName = 'infiniteInput'
}) {
  const [inputList, setInputList] = useState(
    displayedData.length > 0
      ? displayedData.map((x, i) => ({
          id: i + 1,
          inputs: [{ id: 1, value: x.value }]
        }))
      : [
          {
            id: 1,
            inputs: [{ id: 1, value: '' }]
          }
        ]
  )
  return (
    <>
      {inputList.map((x, i) => {
        return (
          <div key={x.id} className='flex w-full flex-col items-end gap-2'>
            <div className='flex w-full items-center gap-1'>
              {x.inputs.map((y, j) => (
                <ComboBox
                  key={y.id}
                  data={data}
                  dataDisplayAttribute='value'
                  defaultSelected={displayedData[i]?.role}
                  name={`${inputName}[${i}]`}
                  onChange={(e) => {
                    const list = [...inputList]
                    list[i].inputs[j].value = e.target.value
                    setInputList(list)
                  }}
                />
              ))}
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
                      inputs: [{ id: 1, value: '' }]
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
