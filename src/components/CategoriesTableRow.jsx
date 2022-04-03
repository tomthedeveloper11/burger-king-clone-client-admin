import { Link } from 'react-router-dom'

export default function CategoriesTableRow(i, category, deleteHandler) {
  return <tr key={i}>
    <td>{i + 1}</td>
    <td>{category.name}</td>
    <td>{category.createdAt}</td>
    <td>{category.createdAt}</td>
    <td>
      <Link to={'/editCategory/' + category.id}>
        <button className='btn btn-sm btn-outline-primary mx-2'>
          Edit
        </button>
      </Link>
      <button
        onClick={() => deleteHandler(category.id)}
        className='btn btn-sm btn-danger mx-2'
      >
        Delete
      </button>
    </td>
  </tr>
}
