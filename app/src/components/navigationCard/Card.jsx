import { useNavigate } from 'react-router-dom'

/**
 *
 * @param {{ description: string, imgURL?: string, title: string, to: string, style: React.CSSProperties }} props
 * @returns {JSX.Element} Card component
 */
export function Card({
  description,
  imgURL = 'https://picsum.photos/300/200',
  title,
  to,
  style
}) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(to)
  }
  return (
    <li
      className='group cursor-pointer rounded-md hover:shadow-lg transition-all duration-200 ease-out'
      style={style}
      onClick={handleClick}
    >
      <img
        className='h-40 w-full transform overflow-hidden rounded-t-md bg-gray-100 object-cover object-center shadow-md transition-all duration-200 ease-out group-hover:rotate-1 group-hover:scale-105 group-hover:shadow-lg md:h-52 rounded-md'
        style={{ aspectRatio: 16 / 9 }}
        src={imgURL}
        alt='card thumbnail'
      />
      <div className='p-2 md:p-4'>
        <h3 className='text-xl font-bold'>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  )
}
