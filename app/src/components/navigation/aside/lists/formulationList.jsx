import { useLocation } from 'react-router-dom'

import { AsideButton } from '..'

/**
 *
 * @param {{handleClick: () => void}} props
 * @returns
 */
export function FormulationList({ handleClick }) {
  const { pathname } = useLocation()
  return (
    <>
      {pathname.includes('formulas') && (
        <>
          <li>
            <AsideButton
              isActive={pathname.includes('productos')}
              label='Formulas Productos'
              onClick={() =>
                handleClick('/app/produccion/formulas/productos')
              }
            />
          </li>
          <li>
            <AsideButton
              isActive={pathname.includes('embalaje')}
              label='Formulas Embalaje'
              onClick={() =>
                handleClick('/app/produccion/formulas/embalaje')
              }
            />
          </li>
        </>
      )}
    </>
  )
}
