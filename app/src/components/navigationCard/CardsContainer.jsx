/**
 *
 * @param {{children: JSX.Element | JSX.Element[]}} props
 * @returns
 */
export function CardsContainer({ children }) {
  return <ul className='grid grid-cols-2 gap-4 md:grid-cols-3 my-4'>{children}</ul>
}
