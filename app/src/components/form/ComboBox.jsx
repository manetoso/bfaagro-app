import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

import { Selector } from '🚀'

/**
 *
 * @param {{data: Array<any>, dataDisplayAttribute: string, defaultSelected: string, emptyMessage: string, name: string, onChange: () => void}} props Data to display, attribute to display, message to show when data is empty and name of the combobox
 * @returns ComboBox component
 */
export function ComboBox({
  data,
  dataDisplayAttribute,
  defaultSelected,
  emptyMessage = 'No encontrado.',
  name = 'combobox',
  onChange = () => {}
}) {
  const [selected, setSelected] = useState(
    defaultSelected
      ? data.find(
          (element) => element[dataDisplayAttribute] === defaultSelected
        )
      : data[0]
  )
  const [query, setQuery] = useState('')

  const filteredData =
    query === ''
      ? data
      : data.filter((element) =>
          element[dataDisplayAttribute]
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  const localOnChange = (event) => {
    setQuery(event.target.value)
    onChange(event)
  }

  return (
    <Combobox name={name} value={selected} onChange={setSelected}>
      <div className='relative w-full'>
        <div className='relative w-full cursor-default overflow-hidden'>
          <Combobox.Input
            className='input w-full max-w-none'
            displayValue={(element) => element[dataDisplayAttribute]}
            onChange={localOnChange}
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <Selector />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className='absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20'>
            {filteredData.length === 0 && query !== '' ? (
              <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                {emptyMessage}
              </div>
            ) : (
              filteredData.map((element) => (
                <Combobox.Option
                  key={element.id}
                  className={({ active, selected }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-black text-white' : 'text-black'
                    } ${selected ? 'bg-black text-white' : 'text-black'}`
                  }
                  value={element}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-black' : 'font-normal'
                        }`}
                      >
                        {element[dataDisplayAttribute]}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
