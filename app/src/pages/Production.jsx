import { PageTransition } from '@/components/layout/PageTransition'
import { Card, CardsContainer } from '@/components/navigationCard'

export const routesList = [
  {
    title: 'Almacenes',
    description: 'Administra almacenes',
    to: '/app/produccion/almacenes'
  },
  {
    title: 'Formulas',
    description: 'Administra ventas',
    to: '/app/produccion/formulas'
  }
]

export function Production() {
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
