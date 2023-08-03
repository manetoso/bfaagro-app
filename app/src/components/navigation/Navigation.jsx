import { useId, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Aside, IconButton } from './'
import { ChevronBack, Menu } from '🚀'

import './navigation.css'

export function Navigation() {
  const menuCheckboxId = useId()
  const inputRef = useRef()
  const navigate = useNavigate()
  return (
    <>
      <nav className='fixed top-0 z-50 w-screen border-b-2 border-black bg-white'>
        <div className='mx-auto flex max-w-[1000px] gap-2 p-2'>
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
              <IconButton onClick={() => history.back()}>
                <ChevronBack />
                Atras
              </IconButton>
            </>
          )}
        </div>
      </nav>
      <input id={menuCheckboxId} ref={inputRef} type='checkbox' hidden />
      <label id='aside-bg' htmlFor={menuCheckboxId} />
      <Aside menuCheckboxId={menuCheckboxId} inputRef={inputRef} />
    </>
  )
}
