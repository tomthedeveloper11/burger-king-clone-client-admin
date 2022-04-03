export default function IngredientsPill(i, ingredient) {
  return (
    <>
      <p key={i} className='badge badge-pill text-dark bg-light'>
        {ingredient.name}
      </p>
      <br />
    </>
  )
}
