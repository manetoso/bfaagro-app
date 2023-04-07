/**
 *
 * @param {{isActive: boolean, label: string, onClick: () => void}} props
 * @returns {JSX.Element} AsideButton component
 */
export function AsideButton({ isActive, label, onClick }) {
  const variations = !isActive && 'border-2 text-black border-black bg-white hover:bg-black/5'
  return (
    <button
      className={`btn w-full focus:shadow-sm ${variations}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
