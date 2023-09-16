import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'

export function RedirectAlert({ isOpen, href }) {
  const navigate = useNavigate()
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={() => {}}>
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
                      Alerta
                    </Dialog.Title>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Parece que la lista de precios no esta actualizada, por favor actualizala para continuar.
                    </p>
                  </div>

                  <div className='mt-4 flex justify-end gap-2'>
                    <button
                      type='button'
                      className='btn'
                      onClick={() => navigate(href)}
                    >
                      Actualizar
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
