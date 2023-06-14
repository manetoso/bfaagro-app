import { RecipesDatatable } from './datatable'
import { Loader } from '@/components/layout'

import { useRecipesDatatable } from '@/hooks/useRecipesDatatable'
import { FIELDS_TYPES } from '@/stores/useRecipesStore'

export function Recipes() {
  const {
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    recipesData,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    isLoading
  } = useRecipesDatatable({ field: FIELDS_TYPES.RECIPES })
  if (isLoading) return <Loader />
  return (
    <>
      <RecipesDatatable
        columns={columns}
        data={recipesData}
        title='Fórmulas Productos'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.RECIPES}
      />
    </>
  )
}
