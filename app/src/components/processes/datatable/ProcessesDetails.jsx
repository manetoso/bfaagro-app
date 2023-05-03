import React from 'react'

export function ProcessesDetails({ recipe, recipes, materials }) {
  if (!recipe.recipeId) {
    return <div className='mt-4'>No hay datos</div>
  }
  const recipeData = recipes.find((x) => x.id === recipe.recipeId)
  return (
    <div className='mt-4'>
      <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
        <span>
          <label>Formula:</label>
          <h6 className='font-bold'>{recipe.recipeData.recipeName}</h6>
        </span>
        <span>
          <label>Producto:</label>
          <h6 className='font-bold'>
            {recipe.recipeData.product.name}, {recipe.recipeData.quantity}{' '}
            {recipe.recipeData.unity}
          </h6>
        </span>
        <span>
          <label>Almacén:</label>
          <h6 className='font-bold'>{recipe.warehouseName}</h6>
        </span>
      </div>
      <div className='mt-4'>
        <label>Formula Original:</label>
        <ul className='mt-2 list-disc pl-6'>
          {recipeData?.details.map((ingredient) => {
            const material = materials.find((x) => x.id === ingredient.id)
            return (
              <li key={ingredient.id}>
                {ingredient.quantity} {material.unity} de {ingredient.name}
              </li>
            )
          })}
        </ul>
      </div>
      {recipe.replaceDetails.length > 0 && (
        <div className='mt-4'>
          <label className='text-amber-600'>Esta formula ha sido editada y se deberán usar los siguientes ingredientes: *</label>
          <ul className='mt-2 list-disc pl-6'>
            {/* TODO: ADD MODIFIED RECIPE */}
          </ul>
        </div>
      )}
    </div>
  )
}
