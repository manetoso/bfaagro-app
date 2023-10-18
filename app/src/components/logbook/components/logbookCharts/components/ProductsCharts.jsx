import { useLogbookStore } from '@/stores/useLogbookStore'
import { ChartCard, CustomPieChart } from '@/components/charts'

import { PIE_CHART_LOTS_COLORS, CHARTS_COLORS as COLORS } from '@/utils/consts'

export function ProductsCharts() {
  const {
    last30DayProductsSale,
    last30DayProductsPurchased,
    topSellingProducts,
    topPurchasingProducts
  } = useLogbookStore()
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
      <ChartCard title='Top 5 Productos más vendidos'>
        <CustomPieChart
          data={topSellingProducts}
          colors={[
            COLORS.GREEN[500],
            COLORS.BLUE[500],
            COLORS.YELLOW[500],
            COLORS.ORANGE[500],
            COLORS.LAVANDER[500]
          ]}
        />
      </ChartCard>
      <ChartCard title='Top 5 productos más comprados'>
        <CustomPieChart
          data={topPurchasingProducts}
          colors={[
            COLORS.GREEN[500],
            COLORS.BLUE[500],
            COLORS.YELLOW[500],
            COLORS.ORANGE[500],
            COLORS.LAVANDER[500]
          ]}
        />
      </ChartCard>
    </>
  )
}
