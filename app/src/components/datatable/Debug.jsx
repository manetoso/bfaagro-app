/**
 *
 * @param {{table: Table<any>, sorting: SortingState}} props Table and SortingState from useReactTable '@tanstack/react-table'
 * @returns Data for debugin purposes
 */
export function Debug({ table, sorting }) {
  return (
    <>
      <div>{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </>
  )
}
