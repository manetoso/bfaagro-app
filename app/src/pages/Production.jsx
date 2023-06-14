import { PageTransition } from '@/components/layout/PageTransition'
import { Card, CardsContainer } from '@/components/navigationCard'

import Formulation from '@/assets/formulation.webp'
import Processes from '@/assets/processes.webp'
import Warehouse from '@/assets/warehouse.webp'

export const routesList = [
  {
    title: 'Almacenes',
    description:
      'Revisa y administra niveles de inventario de materia prima, productos y embalajes.',
    to: '/app/produccion/almacenes/materia-prima',
    imgURL: Warehouse,
    style: { backgroundColor: '#82685e', color: '#e2e2e2' }
  },
  {
    title: 'Fórmulas',
    description: 'Administras el catálogo de fórmulas de productos.',
    to: '/app/produccion/formulas/productos',
    imgURL: Formulation,
    style: { backgroundColor: '#e4e2e7', color: '#363636' }
  },
  {
    title: 'Procesos',
    description:
      'Crea, revisa y administra los procesos de creación de productos.',
    to: '/app/produccion/procesos/tabla',
    imgURL: Processes,
    style: { backgroundColor: '#5e6f76', color: '#e2e2e2' }
  },
  {
    title: 'Procesos por Hacer',
    description: 'Da seguimiento a los procesos de creación de productos.',
    to: '/app/produccion/procesos/porHacer',
    imgURL: Processes,
    style: { backgroundColor: '#5e6f76', color: '#e2e2e2' }
  }
]

export function Production() {
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
