import Form from 'react-bootstrap/Form'
import React from 'react'
import { addCategory } from '../store/actions/categoriesAction'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function CreateCategory() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [newCategory, setNewCategory] = React.useState({
    name: '',
    imgUrl: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function addNewCategory(e) {
    e.preventDefault()

    dispatch(addCategory(newCategory))
    setNewCategory({})

    navigate('/categories')
  }

  return (
    <div className='pages'>
      <h1 className='mb-3'>Create New Category</h1>
      <Form onSubmit={addNewCategory}>
        <Form.Group className='mb-3'>
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={newCategory.name}
            name='name'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Image Url'
            value={newCategory.imgUrl}
            name='imgUrl'
            onChange={handleChange}
          />
        </Form.Group>
        <button
          className='mt-3 col-3 btn BKButton'
          variant='primary'
          type='submit'
        >
          Submit
        </button>
      </Form>
    </div>
  )
}
