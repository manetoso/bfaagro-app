import { useLogbookStore } from '@/stores/useLogbookStore'
import { ChartCard, CustomPieChart } from '@/components/charts'

import { PIE_CHART_LOTS_COLORS } from '@/utils/consts'

export function ProductsCharts() {
  const { last30DayProductsSale, last30DayProductsPurchased } =
    useLogbookStore()
  return (
    <>
      <ChartCard title='Productos vendidos en los ultimos 30 días'>
        <CustomPieChart
          data={last30DayProductsSale}
          colors={PIE_CHART_LOTS_COLORS}
        />
      </ChartCard>
      <ChartCard title='Productos comprados en los ultimos 30 días'>
        <CustomPieChart
          data={last30DayProductsPurchased}
          colors={PIE_CHART_LOTS_COLORS}
        />
      </ChartCard>
    </>
  )
}
