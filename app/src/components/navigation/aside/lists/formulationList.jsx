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
              isActive={pathname.includes('formulas')}
              label='Formulas'
              onClick={() =>
                handleClick('/app/produccion/formulas')
              }
            />
          </li>
        </>
      )}
    </>
  )
}
