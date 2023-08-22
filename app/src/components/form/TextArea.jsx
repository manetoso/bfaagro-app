/**
 *
 * @param {{ defaultValue: string, disabled: boolean, id: string, isEmpty: boolean, label: string, name: string, onChange: () => void, placeholder: string, value: string, required: boolean, readOnly: boolean }} param0
 * @returns {JSX.Element} Input
 */
export function TextArea({
  defaultValue,
  disabled = false,
  id,
  isEmpty,
  label,
  name,
  onChange,
  placeholder,
  value = null,
  required = false,
  readOnly = false
}) {
  return (
    <div className='flex w-full flex-col'>
      <label className='font-bold text-gray-600' htmlFor={id}>
        {label}
      </label>
      {value !== null ? (
        <textarea
          className={`input w-full ${isEmpty && 'border-rose-500'}`}
          defaultValue={defaultValue}
          disabled={disabled}
          value={value}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          rows={3}
        >
        </textarea>
      ) : (
        <textarea
          className={`input w-full ${isEmpty && 'border-rose-500'}`}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          rows={3}
        >
        </textarea>
      )}
    </div>
  )
}
