import Form from 'react-bootstrap/Form'
import React from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../store/actions/userAction'
import { useNavigate } from 'react-router-dom'
import { showError } from '../store/actions/indexAction'

export default function RegisterAdminPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [newUser, setNewUser] = React.useState({
    email: '',
    password: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setNewUser(() => {
      return {
        ...newUser,
        [name]: value,
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    dispatch(register(newUser, navigate))
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }
      })
      .then(() => {
        navigate('/dashboard')
      })
      .catch((err) => {
        showError(err)
      })
  }

  return (
    <div className='pages'>
      <h1 className='mb-3'>Register New Admin</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={newUser.email}
            name='email'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password (Min length: 5)</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={newUser.password}
            name='password'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Phone Number'
            value={newUser.phoneNumber}
            name='phoneNumber'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={newUser.address}
            name='address'
            onChange={handleChange}
            required
          />
        </Form.Group>

        <button
          className='mt-3 col-3 btn BKButton'
          variant='primary'
          type='submit'
        >
          Register
        </button>
      </Form>
    </div>
  )
}
