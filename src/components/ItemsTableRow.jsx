import { Link } from 'react-router-dom'
import IngredientsPill from './IngredientsPill'

export default function ItemsTableBody(i, item, deleteHandler) {
  return (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{item.name}</td>
      <td>{item.Category.name}</td>
      <td>Rp. {item.price.toLocaleString('id-ID')}</td>
      <td>{item.User.email.split('@')[0]}</td>
      <td>
        <img src={item.imgUrl} height='100px' />
      </td>
      <td>
        {item.Ingredients.map((ingredient, i) => {
          return IngredientsPill(i, ingredient)
        })}
      </td>
      <td>
        <Link to={'/editItem/' + item.id}>
          <button className='btn btn-sm btn-outline-primary mx-2'>Edit</button>
        </Link>
        <button
          onClick={() => deleteHandler(item.id)}
          className='btn btn-sm btn-danger mx-2'
        >
          Delete
        </button>
      </td>
    </tr>
  )
}


