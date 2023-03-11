import { useId, useRef } from 'react'
import { Aside, IconButton } from './'
import { Menu } from '🚀'
import './navigation.css'

export function Navigation() {
  const menuCheckboxId = useId()
  const inputRef = useRef()
  return (
    <>
      <nav className='flex w-screen py-2 px-4'>
        <IconButton htmlFor={menuCheckboxId}>
          <Menu />
        </IconButton>
      </nav>
      <input id={menuCheckboxId} ref={inputRef} type='checkbox' hidden />
      <label id='aside-bg' htmlFor={menuCheckboxId} />
      <Aside menuCheckboxId={menuCheckboxId} inputRef={inputRef} />
    </>
  )
}
