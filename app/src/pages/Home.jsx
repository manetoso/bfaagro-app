import { PageTransition } from '@/components/layout/PageTransition'
import { Card, CardsContainer } from '@/components/navigationCard'

import Compras from '@/assets/compras2.webp'
import Ventas from '@/assets/ventas.webp'
import Bitacora from '@/assets/logbook.webp'
import Production from '@/assets/production.webp'
import Ajustes from '@/assets/ajustes.webp'

export const routesList = [
  {
    title: 'Compras',
    description: 'Administra compras',
    to: '/app/compras/inicio',
    imgURL: Compras,
    style: { backgroundColor: '#2c3531', color: '#e2e2e2' }
  },
  {
    title: 'Ventas',
    description: 'Administra ventas',
    to: '/app/ventas/inicio',
    imgURL: Ventas,
    style: { backgroundColor: '#afa793', color: '#363636' }
  },
  {
    title: 'Bitácora',
    description: 'Revisa la bitácora de compras y ventas',
    to: '/app/bitacora',
    imgURL: Bitacora,
    style: { backgroundColor: '#ac9788', color: '#363636' }
  },
  {
    title: 'Producción',
    description: 'Administra almacenes, fórmulas y procesos',
    to: '/app/produccion/inicio',
    imgURL: Production,
    style: { backgroundColor: '#b4b1a9', color: '#363636' }
  },
  {
    title: 'Ajustes',
    description: 'Ajustes de la aplicación',
    to: '/app/usuarios/inicio',
    imgURL: Ajustes,
    style: { backgroundColor: '#252526', color: '#e2e2e2' }
  }
]

export function Home() {
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
