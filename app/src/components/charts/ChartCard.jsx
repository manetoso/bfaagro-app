export function ChartCard({ title = 'Chart Title', children }) {
  return (
    <div className='m-1 flex flex-col gap-2 rounded-md border-2 p-4'>
      <h3 className='font-black'>{title}</h3>
      {children}
    </div>
  )
}
