import React from 'react'

export function ProcessesDetails({ process, recipes, materials }) {
  if (!process.recipeId) {
    return <div className='mt-4'>No hay datos</div>
  }
  return (
    <div className='mt-4'>
      <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
        <span>
          <label>Formula:</label>
          <h6 className='font-bold'>{process.recipeData.recipeName}</h6>
        </span>
        <span>
          <label>Producto:</label>
          <h6 className='font-bold'>
            {process.recipeData.product.name}, {process.recipeData.quantity}{' '}
            {process.recipeData.unity}
          </h6>
        </span>
        <span>
          <label>Almacén:</label>
          <h6 className='font-bold'>{process.warehouse.name}</h6>
        </span>
      </div>
      <div className='mt-4'>
        <label>Ingredientes:</label>
        <ul className='mt-2 list-disc pl-6'>
          {process.recipeData?.details.map((ingredient) => {
            const material = materials.find((x) => x.id === ingredient.id)
            return (
              <li key={ingredient.id}>
                {ingredient.quantity} {material.unity} de {ingredient.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
