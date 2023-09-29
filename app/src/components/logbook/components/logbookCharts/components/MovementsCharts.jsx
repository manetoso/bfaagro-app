import { useLogbookStore } from '@/stores/useLogbookStore'
import { ChartCard, CustomAreaChart, CustomPieChart } from '@/components/charts'

import { CHARTS_COLORS as COLORS } from '@/utils/consts'

export function MovementsCharts() {
  const { yearMovements, yearMovementsByMonth } = useLogbookStore()
  return (
    <>
      <ChartCard title='Ventas y Compras del año'>
        <CustomPieChart
          hasLegend
          data={yearMovements}
          colors={[COLORS.GREEN[500], COLORS.BLUE[500]]}
        />
      </ChartCard>
      <ChartCard title='Ventas y Compras por mes'>
        <CustomAreaChart
          data={yearMovementsByMonth}
          options={[
            {
              dataKey: 'ventas',
              strokeColor: COLORS.GREEN[500],
              gradientColor: COLORS.GREEN[500]
            },
            {
              dataKey: 'compras',
              strokeColor: COLORS.BLUE[500],
              gradientColor: COLORS.BLUE[500]
            }
          ]}
          xLabel='Meses'
          yLabel='Ventas'
        />
      </ChartCard>
    </>
  )
}
