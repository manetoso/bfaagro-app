import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { CHARTS_DEFAULT_COLORS as COLORS } from '@/utils/consts'

const DATA = [
  { name: 'Agosto', compras: 10, ventas: 20 },
  { name: 'Septiembre', compras: 30, ventas: 40 },
  { name: 'Octubre', compras: 80, ventas: 60 },
  { name: 'Noviembre', compras: 40, ventas: 80 }
]

const OPTIONS = [
  {
    dataKey: 'compras',
    strokeColor: COLORS[0],
    gradientColor: COLORS[0]
  },
  { dataKey: 'ventas', strokeColor: COLORS[3], gradientColor: COLORS[3] }
]

export function CustomAreaChart({
  data = DATA,
  xLabel,
  yLabel,
  options = OPTIONS
}) {
  return (
    <ResponsiveContainer width='100%' aspect={16 / 9}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 60, bottom: 10, left: 0 }}
      >
        <defs>
          {options.map((option, index) => (
            <linearGradient
              key={index}
              id={`color-value-${index}`}
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='5%'
                stopColor={option.gradientColor}
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor={option.gradientColor}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray='10' />
        <XAxis
          dataKey='name'
          label={{ value: xLabel, position: 'insideBottomRight', offset: 0 }}
        />
        <YAxis label={{ value: yLabel, angle: -90, offset: 0 }} />
        <Tooltip />
        <Legend />
        {options.map((option, index) => (
          <Area
            key={index}
            type='monotone'
            dataKey={option.dataKey}
            stroke={option.strokeColor}
            fillOpacity={1}
            fill={`url(#color-value-${index})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
