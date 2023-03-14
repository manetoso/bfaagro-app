import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/stores'

import { Close } from '🚀'
import { AsideButton, IconButton } from './'

/**
 *
 * @param {{menuCheckboxId: string , inputRef: React.MutableRefObject<undefined>}} props
 * @returns {JSX.Element} Aside component
 */
export function Aside({ menuCheckboxId, inputRef }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const logout = useAuthStore((store) => store.logout)

  const handleLogout = () => {
    logout()
  }
  const handleClick = (to) => {
    navigate(to)
    inputRef.current.checked = false
  }
  return (
    <aside id='aside' className='bg-white'>
      <IconButton alignSelf htmlFor={menuCheckboxId}>
        <Close />
      </IconButton>
      <ul className='flex flex-col gap-2 overflow-scroll'>
        {pathname.includes('home') && (
          <li>
            <AsideButton
              isActive={pathname.includes('home')}
              label='Inicio'
              onClick={() => handleClick('/app/test')}
            />
          </li>
        )}
        <li>
          <AsideButton isActive label='Salir' onClick={handleLogout} />
        </li>
      </ul>
    </aside>
  )
}
