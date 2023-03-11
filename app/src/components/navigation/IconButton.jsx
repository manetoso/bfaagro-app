/**
 *
 * @param {{children: JSX.Element, htmlFor: string, alignSelf?: boolean}} props
 * @returns {JSX.Element} IconButton component
 */
export function IconButton({ children, htmlFor, alignSelf }) {
  return (
    <label
      className={`flex w-min cursor-pointer items-center justify-center rounded-md border-2 border-transparent p-1 transition-all duration-200 ease-out hover:border-black ${
        alignSelf && 'self-end'
      }`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}
