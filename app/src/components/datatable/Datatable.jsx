import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { BottomControls, Table, TopControls } from './'

export function Datatable({ columns, data, title = 'Table' }) {
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true
  })

  return (
    <div className='p-2'>
      <div className='rounded-md border-2'>
        <div className='flex justify-between p-2 md:py-4 md:px-6'>
          <h3 className='text-xl font-black'>
            {title}{' '}
            <small className='text-xs font-bold text-gray-400'>{`(${data.length} Registros)`}</small>
          </h3>
          <TopControls table={table} />
        </div>
        <div className='overflow-x-auto'>
          <Table flexRender={flexRender} table={table} />
        </div>
        <BottomControls table={table} />
      </div>
    </div>
  )
}

// -------- COLUMNS EXAMPLE --------
// const columnHelper = createColumnHelper()
// const columns = useMemo(
//   () => [
//     columnHelper.accessor('name', {
//       header: 'Nombre',
//       cell: (info) => (
//         <span className='flex items-center justify-between font-bold'>
//           {info.getValue()} <RowDropdownMenu />
//         </span>
//       ),
//       footer: (props) => props.column.id
//     }),
//     columnHelper.accessor('quantity', {
//       header: 'Cantidad',
//       cell: (info) => formatNumberToString(info.getValue()),
//       footer: (props) => props.column.id
//     }),
//     columnHelper.accessor('unity', {
//       header: 'Unidad de Medida',
//       cell: (info) => (
//         <span>
//           {info.getValue() === 'Litros' ? (
//             <span className='rounded-full bg-emerald-100 px-4 py-1 font-semibold text-emerald-500'>
//               {info.getValue()}
//             </span>
//           ) : (
//             <span className='rounded-full bg-rose-100 px-4 py-1 font-semibold text-rose-500'>
//               {info.getValue()}
//             </span>
//           )}
//         </span>
//       ),
//       footer: (props) => props.column.id
//     }),
//     columnHelper.accessor('idProductType', {
//       header: 'Tipo Producto',
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id
//     }),
//     columnHelper.accessor('idWarehouse', {
//       header: 'Tipo Producto',
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id
//     })
//   ],
//   []
// )
