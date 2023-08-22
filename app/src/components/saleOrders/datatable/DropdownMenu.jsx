import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { DotsHorizontal } from '🚀'

export function DropdownMenu({ openModal, openAlert, printHanlder }) {
  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='justify-center rounded-md px-2 py-1 hover:bg-black hover:text-white'>
            <DotsHorizontal />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute -bottom-4 left-14 z-30 mt-2 w-32 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:left-[70px] md:w-56'>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-black text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openModal}
                  >
                    Editar
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-black text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={printHanlder}
                  >
                    Imprimir
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-rose-500 text-white' : 'text-rose-500'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openAlert}
                  >
                    Eliminar
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
