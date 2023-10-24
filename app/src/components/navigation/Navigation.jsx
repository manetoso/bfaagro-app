import { useId, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Aside, IconButton } from './'
import { NotificationDropDown } from './NotificationDropDown'

import { ChevronBack, Menu } from '🚀'

import './navigation.css'
import { useAuthStore } from '@/stores'
import { ROLES } from '@/utils/consts'

export function Navigation() {
  const menuCheckboxId = useId()
  const inputRef = useRef()
  const navigate = useNavigate()
  const { roles } = useAuthStore()
  return (
    <>
      <nav className='fixed top-0 z-50 w-screen border-b-2 border-black bg-white'>
        <div className='mx-auto flex max-w-[1000px] justify-between p-2'>
          <div className='flex gap-2'>
            <IconButton htmlFor={menuCheckboxId}>
              <Menu />
            </IconButton>
            {!window.location.pathname.includes('app/inicio') && (
              <>
                <IconButton onClick={() => navigate('/app/inicio')}>
                  <ChevronBack /> Inicio
                </IconButton>
              </>
            )}
            {!window.location.pathname.includes('app/inicio') && (
              <>
                <IconButton onClick={() => window.history.back()}>
                  <ChevronBack />
                  Atras
                </IconButton>
              </>
            )}
          </div>
          {(roles.includes(ROLES.ADMIN) || roles.includes(ROLES.SALES)) && (
            <span>
              <NotificationDropDown />
            </span>
          )}
        </div>
      </nav>
      <input id={menuCheckboxId} ref={inputRef} type='checkbox' hidden />
      <label id='aside-bg' htmlFor={menuCheckboxId} />
      <Aside menuCheckboxId={menuCheckboxId} inputRef={inputRef} />
    </>
  )
}
