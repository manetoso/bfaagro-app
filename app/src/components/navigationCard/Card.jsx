import { useNavigate } from 'react-router-dom'

/**
 *
 * @param {{title: string, description: string, to: string}} props
 * @returns {JSX.Element} Card component
 */
export function Card({ title, description, to }) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(to)
  }
  return (
    <li
      className='group cursor-pointer rounded-md border-4'
      onClick={handleClick}
    >
      <img
        className='h-40 w-full transform overflow-hidden rounded-t-md bg-gray-100 object-cover object-center shadow-md transition-all duration-200 ease-out group-hover:rotate-1 group-hover:scale-105 group-hover:shadow-lg md:h-52'
        style={{ aspectRatio: 16 / 9 }}
        src='https://picsum.photos/300/200'
        alt='card thumbnail'
      />
      <div className='p-2 md:p-4'>
        <h3 className='text-xl font-bold'>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  )
}
