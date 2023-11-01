import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChaoticOrbit } from '@uiball/loaders'

import { useNotificationDropdown } from '@/hooks/useNotificationDropdown'
import { Bell, Close } from '🚀'

function MenuContent() {
  const { isLoading, notifications, removeNotification } =
    useNotificationDropdown()
  return (
    <>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute -top-2 right-14 z-30 mt-2 h-[14rem] w-56 origin-top-left divide-y divide-gray-100 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-[50px] md:h-[20rem] md:w-80'>
          {isLoading && (
            <div className='flex min-h-[14rem] items-center justify-center md:min-h-[20rem]'>
              <ChaoticOrbit size={35} color='#231F20' />
            </div>
          )}
          {!isLoading && notifications.length > 0 && (
            <>
              {notifications.map((notification) => (
                <div className='px-1 py-1' key={notification.id}>
                  <Menu.Item>
                    {({ active }) => (
                      <div className='relative'>
                        <section
                          className={`${
                            active
                              ? 'bg-black text-white'
                              : 'text-gray-900 hover:bg-gray-100'
                          } group relative flex w-full flex-col justify-center rounded-md px-2 py-2 text-sm`}
                        >
                          <h3 className='font-black'>{notification.type}</h3>
                          <span className='mt-2 font-semibold text-gray-400'>
                            {notification.notification}
                          </span>
                        </section>
                        <button
                          className='absolute top-2 right-2 rounded bg-rose-500 text-white'
                          onClick={() => removeNotification(notification.id)}
                        >
                          <Close />
                        </button>
                      </div>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </>
          )}
          {!isLoading && notifications.length === 0 && (
            <div className='flex min-h-[14rem] items-center justify-center md:min-h-[20rem]'>
              <p className='text-gray-500'>No hay notificaciones</p>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </>
  )
}

export function NotificationDropDown() {
  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        {({ open }) => (
          <>
            <div>
              <Menu.Button className='justify-center rounded-md px-2 py-1 hover:bg-black hover:text-white'>
                <Bell />
              </Menu.Button>
            </div>
            {open && <MenuContent />}
          </>
        )}
      </Menu>
    </>
  )
}
