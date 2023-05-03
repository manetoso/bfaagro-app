import { PageTransition } from '@/components/layout/PageTransition'
import { Card, CardsContainer } from '@/components/navigationCard'

export const routesList = [
  {
    title: 'Compras',
    description: 'Administra compras',
    to: '/app/compras/inicio'
  },
  {
    title: 'Ventas',
    description: 'Administra ventas',
    to: '/app/ventas/inicio'
  },
  {
    title: 'Producción',
    description: 'Administra almacenes, fórmulas y procesos',
    to: '/app/produccion/inicio'
  },
  {
    title: 'Usuarios',
    description: 'Administra usuarios',
    to: '/app/usuarios/inicio'
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
