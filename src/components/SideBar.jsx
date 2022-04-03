import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export function SideBar({}) {
  const navigate = useNavigate()

  function logOutHandler() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <Row className='position-fixed'>
      <Col className='sidebar-col'>
        <img
          src='https://logos-world.net/wp-content/uploads/2020/05/Burger-King-Logo.png'
          height='80px'
          className='d-inline-block align-top mb-4'
          alt='Burger King Logo'
        />
        <NavLink to='/dashboard' className='sidebar-link'>
          <Nav.Item className='py-4 sidebar-item' role='button'>
            Dashboard
          </Nav.Item>
        </NavLink>
        <NavLink to='/categories' className='sidebar-link'>
          <Nav.Item className='py-4 sidebar-item' role='button'>
            Categories
          </Nav.Item>
        </NavLink>
        <NavLink to='/registerAdmin' className='sidebar-link'>
          <Nav.Item className='py-4 sidebar-item' role='button'>
            Register Admin
          </Nav.Item>
        </NavLink>
        <p
          onClick={logOutHandler}
          role='button'
          className='sidebar-link sidebar-item py-4'
        >
          Sign Out
        </p>
      </Col>
    </Row>
  )
}
