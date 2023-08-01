/**
 *
 * @param {{ defaultValue: string, disabled: boolean, id: string, isEmpty: boolean, label: string, name: string, onChange: () => void, placeholder: string, required: boolean, readOnly: boolean, type: 'text' | 'number' | 'password' | 'date' | 'checkbox' | 'email' }} param0
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
  readOnly = false,
  type
}) {
  return (
    <div className='flex w-full flex-col'>
      <label className='font-bold text-gray-600' htmlFor={id}>
        {label}
      </label>
      {type === 'checkbox' ? (
        <div className='flex items-end gap-2'>
          <input
            className='mt-2 h-6 w-6'
            defaultChecked={defaultValue}
            disabled={disabled}
            id={id}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            type={type}
          />
          <span className='ml-2 text-gray-600'>{label}</span>
        </div>
      ) : (
        <input
          className={`input w-full ${isEmpty && 'border-rose-500'}`}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          type={type}
          step={type === 'number' ? '0.01' : undefined}
          // type=''
        />
      )}
    </div>
  )
}
