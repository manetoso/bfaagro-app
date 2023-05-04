import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/stores'

import { Close } from '🚀'
import { AsideButton } from './'
import { IconButton } from '../'
import { FormulationList, WarehouseList, ProcessesList } from './lists'

/**
 *
 * @param {{menuCheckboxId: string , inputRef: React.MutableRefObject<undefined>}} props
 * @returns {JSX.Element} Aside component
 */
export function Aside({ menuCheckboxId, inputRef }) {
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
        <WarehouseList handleClick={handleClick} />
        <FormulationList handleClick={handleClick} />
        <ProcessesList handleClick={handleClick} />
        <li className='mt-6'>
          <AsideButton isActive label='Salir' onClick={handleLogout} />
        </li>
      </ul>
    </aside>
  )
}
