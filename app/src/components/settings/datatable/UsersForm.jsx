import { useSettingsStore } from '@/stores/useSettingsStore'
import { Input } from '@/components/form'
import { InfiniteInput } from './InfiniteInput'

/**
 *
 * @param {{ selectedRow: object, submitAction: () => void, field: string }} props State and function to close the modal
 * @returns Modal to edit a row
 */
export function UsersForm({ selectedRow, submitAction, field }) {
  const { rolesData } = useSettingsStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = {}

    for (const [key, value] of formData.entries()) {
      if (!isNaN(value) && value !== '') {
        data[key] = parseFloat(value)
      } else {
        data[key] = value
      }
    }

    const infiniteInput = []
    const infiniteValueInput = []
    const selectedRoles = []
    for (const [key, value] of formData.entries()) {
      if (key.includes('infiniteInput') && key.includes('value')) {
        infiniteValueInput.push(value)
      }
      if (key.includes('infiniteInput') && key.includes('id')) {
        infiniteInput.push(value)
      }
    }
    infiniteInput.forEach((id, index) => {
      selectedRoles.push({
        id: id,
        role: infiniteValueInput[index]
      })
    })
    const formatedData = {
      user: data.user,
      roles: selectedRoles
    }
    if (formatedData.roles.length === 0) {
      delete formatedData.roles
    }
    if (data.password) {
      formatedData.password = String(data.password)
    }
    submitAction(formatedData, field)
  }
  return (
    <>
      <form
        className='mx-auto mt-4 flex max-w-xs flex-col items-center gap-2'
        onSubmit={handleSubmit}
      >
        <Input
          defaultValue={
            Object.keys(selectedRow).length === 0 ? '' : selectedRow.user
          }
          id='user'
          label='Usuario'
          name='user'
          required={false}
          placeholder='admin'
          type='text'
        />
        {Object.keys(selectedRow).length === 0 ? (
          <Input
            defaultValue=''
            id='password'
            label='Contraseña'
            name='password'
            required={false}
            placeholder='********'
            type='password'
          />
        ) : (
          <div className='w-full'>
            <label className='font-bold text-gray-600'>Roles del usuario</label>
            <InfiniteInput data={rolesData} displayedData={selectedRow.roles} />
          </div>
        )}
        <button type='submit' className='btn'>
          Guardar
        </button>
      </form>
    </>
  )
}
