import { PageTransition } from '@/components/layout/PageTransition'
import { Card, CardsContainer } from '@/components/navigationCard'

import Clients from '@/assets/clients.webp'
import OrdenCompra from '@/assets/orden-compra.webp'
import CuentasPagar from '@/assets/cuentas-pagar.webp'
import Pagos from '@/assets/pagos.webp'

export const routesList = [
  {
    title: 'Clientes',
    description:
      'Revisa y administra los clientes de los productos que vendes.',
    to: '/app/ventas/clientes',
    imgURL: Clients,
    style: { backgroundColor: '#898784', color: '#e2e2e2' }
  },
  {
    title: 'Ordenes de Venta',
    description: 'Crea, revisa y administra las ordenes de venta.',
    to: '/app/ventas/ordenes',
    imgURL: OrdenCompra,
    style: { backgroundColor: '#777771', color: '#e2e2e2' }
  },
  {
    title: 'Cuentas por Cobrar',
    description:
      'Revisa y administra las cuentas por cobrar de las ordenes de venta.',
    to: '/app/ventas/cuentas',
    imgURL: CuentasPagar,
    style: { backgroundColor: '#aaafaf', color: '#363636' }
  },
  {
    title: 'Cobros',
    description: 'Revisa y administra los pagos de las cuentas por cobrar.',
    to: '/app/ventas/pagos',
    imgURL: Pagos,
    style: { backgroundColor: '#a9855e', color: '#e2e2e2' }
  }
]

export function Sales() {
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
