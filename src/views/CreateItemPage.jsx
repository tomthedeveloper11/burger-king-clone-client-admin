import Form from 'react-bootstrap/Form'
import React, { useEffect } from 'react'
import { addItem, fetchItems } from '../store/actions/itemsAction'
import { fetchCategories } from '../store/actions/categoriesAction'
import { showError } from '../store/actions/indexAction'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesOptions from '../components/CatgoriesOptions'

export default function CreateItem() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [newItem, setNewItem] = React.useState({
    name: '',
    description: '',
    price: '',
    imgUrl: '',
    authorId: localStorage.userId,
    categoryId: '',
    ingredient1: '',
    ingredient2: '',
  })
  const { categories } = useSelector((state) => state.categoriesReducer)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  function handleChange(event) {
    const { name, value } = event.target

    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function addNewItem(e) {
    e.preventDefault()

    dispatch(addItem(newItem))
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }

        return data
      })
      .then(() => {
        setNewItem({})
        dispatch(fetchItems())
        navigate('/dashboard')
      })
      .catch((err) => {
        showError(err)
      })
  }

  return (
    <div className='pages'>
      <h1 className='mb-3'>Create New Item</h1>
      <Form onSubmit={addNewItem}>
        <Form.Group className='mb-3'>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={newItem.name}
            name='name'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Description'
            value={newItem.description}
            name='description'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Price (Min. 5000)</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter Price'
            value={newItem.price}
            name='price'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Image Url'
            value={newItem.imgUrl}
            name='imgUrl'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className='d-flex'>
          <Form.Group className='mb-3 col-6 ps-0 pe-2'>
            <Form.Label>Ingredient 1</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Ingredient 1'
              value={newItem.ingredient1}
              name='ingredient1'
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3 col-6 pe-0 ps-2'>
            <Form.Label>Ingredient 2</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Ingredient 2'
              value={newItem.ingredient2}
              name='ingredient2'
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>
        <Form.Select
          value={newItem.categoryId}
          name='categoryId'
          onChange={handleChange}
          required
        >
          {categories.map((category, i) => {
            return CategoriesOptions(i, category)
          })}
          <option value='' selected disabled>
            Please choose item category
          </option>
        </Form.Select>

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
