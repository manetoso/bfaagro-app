import { Link } from 'react-router-dom'

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
  return (
    <li
      className='group cursor-pointer rounded-md transition-all duration-200 ease-out hover:shadow-lg'
      style={style}
    >
      <Link to={to} className='flex h-full flex-col'>
        <img
          className='h-40 w-full transform overflow-hidden rounded-md rounded-t-md bg-gray-100 object-cover object-center shadow-md transition-all duration-200 ease-out group-hover:rotate-1 group-hover:scale-105 group-hover:shadow-lg md:h-52'
          style={{ aspectRatio: 16 / 9 }}
          src={imgURL}
          alt='card thumbnail'
        />
        <div className='p-2 md:p-4'>
          <h3 className='text-xl font-bold'>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </li>
  )
}
