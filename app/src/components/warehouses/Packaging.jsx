import { useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { Datatable, RowDropdownMenu } from '../datatable'
import { getRawMaterial } from '@/services/rawMaterial'
import { formatNumberToString } from '@/utils/utils'

export function Packaging() {
  const data = getRawMaterial()
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Nombre',
        cell: (info) => (
          <span className='flex items-center justify-between gap-2 font-bold'>
            {info.getValue()} <RowDropdownMenu />
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('quantity', {
        header: 'Cantidad',
        cell: (info) => formatNumberToString(info.getValue()),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('unity', {
        header: 'Unidad de Medida',
        cell: (info) => (
          <span>
            {info.getValue() === 'Litros' ? (
              <span className='rounded-full bg-emerald-100 px-4 py-1 font-semibold text-emerald-500'>
                {info.getValue()}
              </span>
            ) : (
              <span className='rounded-full bg-rose-100 px-4 py-1 font-semibold text-rose-500'>
                {info.getValue()}
              </span>
            )}
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('idProductType', {
        header: 'Tipo Producto',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('idWarehouse', {
        header: 'Tipo Producto',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      })
    ],
    []
  )
  return (
    <Datatable
      columns={columns}
      data={data}
      mainColumnId='name'
      title='Embalajes'
    />
  )
}
