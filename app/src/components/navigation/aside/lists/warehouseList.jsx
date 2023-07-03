import { useLocation } from 'react-router-dom'

import { AsideButton } from '..'

/**
 *
 * @param {{handleClick: () => void}} props
 * @returns
 */
export function WarehouseList({ handleClick }) {
  const { pathname } = useLocation()
  return (
    <>
      {pathname.includes('almacenes') && (
        <>
          <li>
            <AsideButton
              isActive={pathname.includes('materia-prima')}
              label='Materia Prima'
              onClick={() =>
                handleClick('/app/produccion/almacenes/materia-prima')
              }
            />
          </li>
          <li>
            <AsideButton
              isActive={pathname.includes('productos')}
              label='Productos'
              onClick={() => handleClick('/app/produccion/almacenes/productos')}
            />
          </li>
          <li>
            <AsideButton
              isActive={pathname.includes('embalaje')}
              label='Embalaje'
              onClick={() => handleClick('/app/produccion/almacenes/embalaje')}
            />
          </li>
          <li>
            <AsideButton
              isActive={pathname.includes('prod-terminados')}
              label='Productos Terminados'
              onClick={() => handleClick('/app/produccion/almacenes/prod-terminados')}
            />
          </li>
          <li>
            <AsideButton
              isActive={pathname.includes('recibo-mercancia')}
              label='Recibo de Mercancia'
              onClick={() => handleClick('/app/produccion/almacenes/recibo-mercancia')}
            />
          </li>
        </>
      )}
    </>
  )
}
