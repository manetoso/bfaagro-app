import { PageTransition } from '@/components/layout/PageTransition'
import { Card, CardsContainer } from '@/components/navigationCard'

import Proveedores from '@/assets/proveedores.webp'
import OrdenCompra from '@/assets/orden-compra.webp'
import CuentasPagar from '@/assets/cuentas-pagar.webp'
import Pagos from '@/assets/pagos.webp'

export const routesList = [
  {
    title: 'Proveedores',
    description:
      'Revisa y administra los proveedores de los productos que compras.',
    to: '/app/compras/proveedores',
    imgURL: Proveedores,
    style: { backgroundColor: '#898784', color: '#e2e2e2' }
  },
  {
    title: 'Ordenes de Compra',
    description: 'Crea, revisa y administra las ordenes de compra.',
    to: '/app/compras/ordenes',
    imgURL: OrdenCompra,
    style: { backgroundColor: '#777771', color: '#e2e2e2' }
  },
  {
    title: 'Cuentas por Pagar',
    description:
      'Revisa y administra las cuentas por pagar de las ordenes de compra.',
    to: '/app/compras/cuentas',
    imgURL: CuentasPagar,
    style: { backgroundColor: '#aaafaf', color: '#363636' }
  },
  {
    title: 'Pagos',
    description: 'Revisa y administra los pagos de las cuentas por pagar.',
    to: '/app/compras/pagos',
    imgURL: Pagos,
    style: { backgroundColor: '#a9855e', color: '#e2e2e2' }
  }
]

export function Purchases() {
  return (
    <PageTransition>
      <CardsContainer>
        {routesList.map(({ description, imgURL, title, to, style }, index) => (
          <Card
            key={index}
            description={description}
            imgURL={imgURL}
            title={title}
            to={to}
            style={style}
          />
        ))}
      </CardsContainer>
    </PageTransition>
  )
}
