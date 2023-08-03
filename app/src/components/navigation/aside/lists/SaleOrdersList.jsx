import { useLocation } from 'react-router-dom'

import { AsideButton } from '..'

/**
 *
 * @param {{handleClick: () => void}} props
 * @returns
 */
export function SaleOrdersList({ handleClick }) {
  const { pathname } = useLocation()
  return (
    <>
      {pathname.includes('ventas/ordenes') && (
        <>
          <li>
            <AsideButton
              isActive={pathname.includes('bfa')}
              label='Ordenes BFA'
              onClick={() => handleClick('/app/ventas/ordenes/bfa')}
            />
          </li>
          <li>
            <AsideButton
              isActive={pathname.includes('comisionistas')}
              label='Ordenes Comisionistas'
              onClick={() => handleClick('/app/ventas/ordenes/comisionistas')}
            />
          </li>
        </>
      )}
    </>
  )
}
