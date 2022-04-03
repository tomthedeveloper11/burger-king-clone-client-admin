import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  fetchCategoryById,
  editCategory,
} from '../store/actions/categoriesAction'
import { useDispatch, useSelector } from 'react-redux'
import { showError } from '../store/actions/indexAction'

export default function EditCategory() {
  const navigate = useNavigate()
  const { id } = useParams()

  const dispatch = useDispatch()
  const category = useSelector((state) => state.categoriesReducer.categoryById)

  const [updateCategory, setUpdateCategory] = React.useState(category)

  useEffect(() => {
    dispatch(fetchCategoryById(id))
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }

        return data
      })
      .then((result) => {
        setUpdateCategory(result)
      })
      .catch((err) => {
        showError(err)
      })
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setUpdateCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function submitEditCategory(e) {
    e.preventDefault()
    dispatch(editCategory(id, updateCategory)).then(() => {
      setUpdateCategory({})
      navigate('/categories')
    })
  }

  return (
    <div className='pages'>
      <h1>Edit Category Page</h1>
      <Form onSubmit={submitEditCategory}>
        <Form.Group className='mb-3'>
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={updateCategory.name}
            name='name'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Image Url'
            value={updateCategory.imgUrl}
            name='imgUrl'
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}
