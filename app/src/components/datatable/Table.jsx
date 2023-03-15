import { Filter } from './'

/**
 *
 * @param {{table: Table<any>, flexRender: any}} props Table from useReactTable '@tanstack/react-table', flexRender from '@tanstack/react-table'
 * @returns Table component for the Datatable
 */
export function Table({ table, flexRender }) {
  return (
    <>
      <input id='filters-input' type='checkbox' className='hidden' />
      <table
        className='w-full'
        style={{ borderCollapse: 'separate', borderSpacing: 0 }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className='border-y-2 bg-white p-2 text-start uppercase first:sticky first:left-0 first:z-10 first:border-r-2 md:min-w-[180px] md:py-4 md:px-6'
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽'
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className='border-b-2 bg-white py-2 px-2 first:sticky first:left-0 first:z-10 first:border-r-2  md:py-4 md:px-6'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
