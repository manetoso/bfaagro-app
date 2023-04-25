import { RecipesDatatable } from './datatable'

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
    toggleEditModal
  } = useRecipesDatatable({ field: FIELDS_TYPES.RECIPES })
  return (
    <>
      <RecipesDatatable
        columns={columns}
        data={recipesData}
        title='Fórmulas'
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
