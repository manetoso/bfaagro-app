import { PageTransition } from '@/components/layout/PageTransition'
import { Card, CardsContainer } from '@/components/navigationCard'

export const routesList = [
  {
    title: 'Almacenes',
    description: 'Revisa y administra niveles de inventario de materia prima, productos y embalajes.',
    to: '/app/produccion/almacenes/materia-prima'
  },
  {
    title: 'Fórmulas',
    description: 'Administras el catálogo de fórmulas de productos.',
    to: '/app/produccion/formulas'
  },
  {
    title: 'Procesos',
    description: 'Revisa y administra los procesos de creación de productos.',
    to: '/app/produccion/procesos'
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
