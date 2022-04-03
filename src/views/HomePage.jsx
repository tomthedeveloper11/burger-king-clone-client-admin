import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/SideBar'

export default function HomePage() {
  return (
    <>
      <SideBar></SideBar>
      <Outlet />
    </>
  )
}
