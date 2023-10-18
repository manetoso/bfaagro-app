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

import { CHARTS_COLORS as COLORS } from '@/utils/consts'

const DATA = [
  { name: 'Agosto', compras: 10, ventas: 20, amt: 24, b: 16, c: 66 },
  { name: 'Septiembre', compras: 30, ventas: 40, amt: 22, b: 29, c: 32 },
  { name: 'Octubre', compras: 80, ventas: 60, amt: 29, b: 25, c: 12 },
  { name: 'Noviembre', compras: 40, ventas: 80, amt: 20, b: 17, c: 6 }
]

const OPTIONS = [
  {
    dataKey: 'compras',
    strokeColor: COLORS.GREEN[500],
    gradientColor: COLORS.GREEN[500]
  },
  {
    dataKey: 'ventas',
    strokeColor: COLORS.BLUE[500],
    gradientColor: COLORS.BLUE[500]
  },
  {
    dataKey: 'amt',
    strokeColor: COLORS.LAVANDER[500],
    gradientColor: COLORS.LAVANDER[500]
  },
  {
    dataKey: 'b',
    strokeColor: COLORS.ORANGE[500],
    gradientColor: COLORS.ORANGE[500]
  },
  {
    dataKey: 'c',
    strokeColor: COLORS.YELLOW[500],
    gradientColor: COLORS.YELLOW[500]
  }
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
