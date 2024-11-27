import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
      <header>
        <h1>Header here</h1>
        <nav>
            <li><NavLink to='/'>Profile</NavLink></li>
            <li><NavLink to='/edit'>Edit</NavLink></li>
            <li><NavLink to='/signin'>SignIn</NavLink></li>
            <li><NavLink to='/login'>LogIn</NavLink></li>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Root
