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
import { formatNumberToString } from '@/utils/utils'

/**
 *
 * @param {{columns: ColumnDef<unknown, unknown>[], data: any, title: string, addHandler () => void}} props
 * @returns DataTable
 */
export function Datatable({ columns, data, title = 'Table', addHandler }) {
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
    <>
      <div className='rounded-md border-2'>
        <div className='flex justify-between p-2 md:py-4 md:px-6'>
          <h3 className='text-xl font-black'>
            {title}{' '}
            <small className='text-xs font-bold text-gray-400'>{`(${formatNumberToString(
              data.length
            )} Registros)`}</small>
          </h3>
          <TopControls table={table} addHandler={addHandler} />
        </div>
        <div className='overflow-x-auto'>
          <Table flexRender={flexRender} table={table} />
        </div>
        <BottomControls table={table} />
      </div>
    </>
  )
}

// -------- COLUMNS EXAMPLE --------
// const columnHelper = createColumnHelper()
// const columns = useMemo(
//   () => [
//     columnHelper.accessor('name', {
//       header: 'Nombre',
//       cell: (info) => (
//         <span className='flex items-center justify-between gap-2 font-bold'>
//           {info.getValue()}{' '}
//           <DropdownMenu
//             openAlert={() => toggleAlert(info.cell.row.original)}
//             openModal={() => {
//               toggleEditModal(info.cell.row.original)
//             }}
//           />
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
// )
