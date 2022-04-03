import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchItemById, editItem } from '../store/actions/itemsAction'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesOptions from '../components/CatgoriesOptions'
import { showError } from '../store/actions/indexAction'

export default function EditItem() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const item = useSelector((state) => state.itemsReducer.itemById)
  const { categories } = useSelector((state) => state.categoriesReducer)

  const [updateItem, setUpdateItem] = React.useState(item)

  useEffect(() => {
    dispatch(fetchItemById(id))
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }

        return data
      })
      .then((result) => {
        setUpdateItem(result)
      })
      .catch((err) => {
        showError(err)
      })
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setUpdateItem((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function submitEditItem(e) {
    e.preventDefault()
    dispatch(editItem(id, updateItem))
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }
        dispatch({ type: 'editItem', payload: {} })
      })
      .then(() => {
        setUpdateItem({})
        navigate('/dashboard')
      })
      .catch((err) => {
        console.log(err)
        showError(err)
      })
  }

  return (
    <div className='pages'>
      <h1>Edit Item Page</h1>
      <Form onSubmit={submitEditItem}>
        <Form.Group className='mb-3'>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={updateItem.name}
            name='name'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Description'
            value={updateItem.description}
            name='description'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Price (Min. 5000)</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter Price'
            value={updateItem.price}
            name='price'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Image Url'
            value={updateItem.imgUrl}
            name='imgUrl'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Select
          value={updateItem.categoryId}
          name='categoryId'
          onChange={handleChange}
        >
          {categories.map((category, i) => {
            return CategoriesOptions(i, category)
          })}
        </Form.Select>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}
