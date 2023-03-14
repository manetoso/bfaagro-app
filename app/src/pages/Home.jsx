import { PageTransition } from '@/components/layout/PageTransition'
import { Card, CardsContainer } from '@/components/navigationCard'

export const routesList = [
  {
    title: 'Compras',
    description: 'Administra compras',
    to: '/app/compras'
  },
  {
    title: 'Ventas',
    description: 'Administra ventas',
    to: '/app/ventas'
  },
  {
    title: 'Producción',
    description: 'Administra almacenes',
    to: '/app/produccion'
  },
  {
    title: 'Usuarios',
    description: 'Administra usuarios',
    to: '/app/usuarios'
  }
]

export function Home() {
  return (
    <PageTransition>
      <CardsContainer>
        {routesList.map(({ description, title, to }, index) => (
          <Card key={index} title={title} description={description} to={to} />
        ))}
      </CardsContainer>
    </PageTransition>
  )
}
