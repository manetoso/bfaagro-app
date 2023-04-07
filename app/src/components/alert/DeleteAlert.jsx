import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { Close } from '🚀'

/**
 *
 * @param {{isOpen: boolean, closeAlert: () => void, deleteOnClick: () => void}} props State, function to close the modal and delete function
 * @returns Alert before deleting a row
 */
export function DeleteAlert({ isOpen, closeAlert, deleteOnClick }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeAlert}>
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
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex items-end justify-between'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-black leading-5'
                    >
                      Eliminar
                    </Dialog.Title>
                    <button
                      className='flex w-min cursor-pointer items-center justify-center rounded-md border-2 border-transparent p-1 transition-all duration-200 ease-out hover:border-black'
                      onClick={closeAlert}
                    >
                      <Close />
                    </button>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      ¿Estás seguro de que quieres eliminar este registro?
                    </p>
                  </div>

                  <div className='mt-4 flex justify-end gap-2'>
                    <button type='button' className='btn' onClick={closeAlert}>
                      Cancelar
                    </button>
                    <button
                      type='button'
                      className='btn bg-rose-500 text-white hover:bg-rose-600 focus-visible:ring-rose-500'
                      onClick={deleteOnClick}
                    >
                      Eliminar
                    </button>
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
