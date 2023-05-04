import { useLocation } from 'react-router-dom'

import { AsideButton } from '..'

/**
 *
 * @param {{handleClick: () => void}} props
 * @returns
 */
export function ProcessesList({ handleClick }) {
  const { pathname } = useLocation()
  return (
    <>
      {pathname.includes('procesos') && (
        <>
          <li>
            <AsideButton
              isActive={pathname.includes('tabla')}
              label='Procesos'
              onClick={() =>
                handleClick('/app/produccion/procesos/tabla')
              }
            />
          </li>
          <li>
            <AsideButton
              isActive={pathname.includes('porHacer')}
              label='Procesos por Hacer'
              onClick={() => handleClick('/app/produccion/procesos/porHacer')}
            />
          </li>
        </>
      )}
    </>
  )
}
