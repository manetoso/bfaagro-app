import { PageTransition } from '@/components/layout/PageTransition'
import { Card, CardsContainer } from '@/components/navigationCard'
import { routesList } from '@/routes/routesList'

export function Home() {
  return (
    <PageTransition>
      <CardsContainer>
        {routesList
          .filter(
            (route) =>
              route.to.includes('almacenes') || route.to.includes('formulas')
          )
          .map(({ description, title, to }, index) => (
            <Card key={index} title={title} description={description} to={to} />
          ))}
      </CardsContainer>
    </PageTransition>
  )
}
