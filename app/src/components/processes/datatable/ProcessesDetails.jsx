import React from 'react'

export function ProcessesDetails({ process, recipes, materials }) {
  if (!process.recipeId) {
    return <div className='mt-4'>No hay datos</div>
  }
  const recipe = recipes.find((x) => x.id === process.recipeId)
  return (
    <div className='mt-4'>
      <div className='grid grid-cols-2 gap-2'>
        <span>
          <label>Formula:</label>
          <h6 className='font-bold'>{process.recipeData.recipeName}</h6>
        </span>
        <span>
          <label>Producto:</label>
          <h6 className='font-bold'>
            {process.recipeData.product.name},{' '}
            {recipe.quantity * process.quantity} {recipe.unity}
          </h6>
        </span>
      </div>
      <div className='mt-4'>
        <div className='grid grid-cols-2 gap-2'>
          <span>
            <label>Ingredientes:</label>
            <ul className='mt-2 list-disc pl-6'>
              {process.recipeData?.details.map((ingredient) => {
                const material = materials.find((x) => x.id === ingredient.id)
                return (
                  <li key={ingredient.id}>
                    {ingredient.quantity * process.quantity} {material.unity} de{' '}
                    {ingredient.name}
                  </li>
                )
              })}
            </ul>
          </span>
          <span>
            <label>Observaciones:</label>
            <h6
              className={`font-bold ${
                process.observations && 'text-amber-500'
              }`}
            >
              {process.observations || 'Sin observaciones'}
            </h6>
          </span>
        </div>
      </div>
    </div>
  )
}
