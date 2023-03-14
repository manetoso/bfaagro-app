/**
 *
 * @param {{isActive: boolean, label: string, onClick: () => void}} props
 * @returns {JSX.Element} AsideButton component
 */
export function AsideButton({ isActive, label, onClick }) {
  const variations = isActive
    ? 'bg-black text-white hover:bg-black/90'
    : 'border-2 border-black bg-white hover:bg-black/5'
  return (
    <button
      className={`w-full cursor-pointer rounded-md p-2 px-7 transition-all duration-200 ease-in-out focus:shadow-sm ${variations}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
