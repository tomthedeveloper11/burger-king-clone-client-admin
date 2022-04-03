import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/userAction'
import { useNavigate } from 'react-router-dom'
import { showError } from '../store/actions/indexAction'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [input, setInput] = React.useState({
    email: '',
    password: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setInput(() => {
      return {
        ...input,
        [name]: value,
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    dispatch(login(input))
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }

        return data
      })
      .then((data) => {
        localStorage.access_token = data.access_token
        localStorage.userId = data.user.id
        localStorage.userEmail = data.user.email
        localStorage.userRole = data.user.role
        navigate('/dashboard')
      })
      .catch((err) => {
        showError(err)
      })
  }

  return (
    <>
      <div id='loginPage'>
        <div className='container'>
          <div className='col-md-10 mx-md-auto'>
            <div className='login-box pl-lg-5 pl-0'>
              <div className='row no-gutters align-items-center'>
                <div className='col-md-6'>
                  <div className='form-wrap'>
                    <h1 className='index-title text-center mb-4'>Log in</h1>
                    <form className='form' onSubmit={handleSubmit}>
                      <div className='row'>
                        <div className='col-12'>
                          <div className='form-group position-relative'>
                            <span className='zmdi zmdi-email'></span>
                            <input
                              value={input.email}
                              onChange={handleChange}
                              type='email'
                              className='email form-control'
                              placeholder='Email Address'
                              name='email'
                              required
                            />
                          </div>
                        </div>
                        <div className='col-12'>
                          <div className='form-group position-relative'>
                            <span className='zmdi zmdi-key'></span>
                            <input
                              value={input.password}
                              onChange={handleChange}
                              type='password'
                              className='password form-control'
                              placeholder='Password'
                              name='password'
                              required
                            />
                          </div>
                        </div>
                        <div className='col-12 loginBtn'>
                          <button
                            type='submit'
                            className='btn btn-lg col-12'
                            style={{ color: '#f5ebdc' }}
                          >
                            Log in
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='content text-center'>
                    <img
                      src='https://logos-world.net/wp-content/uploads/2020/05/Burger-King-Logo.png'
                      height='250px'
                      className='d-inline-block align-top mb-4'
                      alt='Burger King Logo'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
