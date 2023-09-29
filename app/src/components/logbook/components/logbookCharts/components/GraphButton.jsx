export function GraphButton({ onClick, selected, id }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ${
        selected === id ? 'bg-black text-white' : 'hover:bg-black/10'
      }`}
    >
      {id}
    </button>
  )
}
