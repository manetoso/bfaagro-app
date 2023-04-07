import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { Close } from '🚀'

/**
 *
 * @param {{isOpen: boolean, closeModal: () => void, title: string, children: JSX.Element | JSX.Element[]}} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function EmptyModal({ isOpen, closeModal, title, children }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-end text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-6'
                enterTo='opacity-100 translate-y-0'
                leave='ease-in duration-200'
                leaveFrom='translate-y-0'
                leaveTo='translate-y-full'
              >
                <Dialog.Panel className='h-[60vh] w-full transform overflow-hidden overflow-y-auto border-t-4 border-black bg-white py-6 text-left align-middle shadow-xl transition-all'>
                  <div className='mx-auto max-w-[1000px] px-4'>
                    <div className='flex items-end justify-between'>
                      <Dialog.Title
                        as='h3'
                        className='text-2xl font-black leading-5'
                      >
                        {title}
                        {/* {Object.keys(selectedRow).length === 0
                          ? 'Agregar'
                          : 'Editar'} */}
                      </Dialog.Title>
                      <button
                        className='flex w-min cursor-pointer items-center justify-center rounded-md border-2 border-transparent p-1 transition-all duration-200 ease-out hover:border-black'
                        onClick={closeModal}
                      >
                        <Close />
                      </button>
                    </div>
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
