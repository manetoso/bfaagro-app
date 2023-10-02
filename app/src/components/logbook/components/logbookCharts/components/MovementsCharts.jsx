import { useLogbookStore } from '@/stores/useLogbookStore'
import { ChartCard, CustomAreaChart, CustomPieChart } from '@/components/charts'

import { CHARTS_COLORS as COLORS } from '@/utils/consts'

export function MovementsCharts() {
  const {
    yearMovements,
    yearMovementsMXN,
    yearMovementsUSD,
    yearMovementsByMonth,
    yearMovementsMxnByMonth,
    yearMovementsUsdByMonth
  } = useLogbookStore()
  return (
    <>
      <ChartCard title='Movimientos del año'>
        <CustomPieChart
          hasLegend
          data={yearMovements}
          colors={[COLORS.GREEN[500], COLORS.BLUE[500]]}
        />
      </ChartCard>
      <ChartCard title='Movimientos por mes'>
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
      <ChartCard title='Movimientos en MXN del año'>
        <CustomPieChart
          hasLegend
          data={yearMovementsMXN}
          colors={[COLORS.GREEN[500], COLORS.BLUE[500]]}
        />
      </ChartCard>
      <ChartCard title='Movimientos en MXN por mes'>
        <CustomAreaChart
          data={yearMovementsMxnByMonth}
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
      <ChartCard title='Movimientos en USD del año'>
        <CustomPieChart
          hasLegend
          data={yearMovementsUSD}
          colors={[COLORS.GREEN[500], COLORS.BLUE[500]]}
        />
      </ChartCard>
      <ChartCard title='Movimientos en USD por mes'>
        <CustomAreaChart
          data={yearMovementsUsdByMonth}
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
