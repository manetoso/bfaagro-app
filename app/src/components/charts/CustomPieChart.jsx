import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts'

import { CHARTS_DEFAULT_COLORS as COLORS } from '@/utils/consts'

const DATA = [
  { name: 'Ventas', value: 400 },
  { name: 'Compras', value: 300 },
  { name: 'Pagos', value: 300 },
  { name: 'Cobros', value: 200 },
  { name: 'Gastos', value: 100 },
  { name: 'Ingresos', value: 100 },
  { name: 'Otros', value: 100 }
]

export function CustomPieChart({ data = DATA, colors = COLORS, hasLegend }) {
  return (
    <ResponsiveContainer width='100%' aspect={16 / 9}>
      <PieChart>
        <Tooltip />
        {hasLegend && <Legend />}
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          label
          outerRadius='80%'
          innerRadius='40%'
          dataKey='value'
          legendType='circle'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
