/**
 *
 * @param {{defaultValue: string, disabled: boolean, id: string, isEmpty: boolean, label: string, name: string, onChange: () => void, placeholder: string, required: boolean, type: 'text' | 'number'}} param0
 * @returns {JSX.Element} Input
 */
export function Input({
  defaultValue,
  disabled = false,
  id,
  isEmpty,
  label,
  name,
  onChange,
  placeholder,
  required = true,
  type
}) {
  return (
    <div className='flex w-full flex-col'>
      <label className='font-bold text-gray-600' htmlFor={id}>
        {label}
      </label>
      <input
        className={`input w-full ${isEmpty && 'border-rose-500'}`}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        step={type === 'number' ? '0.01' : undefined}
        // type=''
      />
    </div>
  )
}
