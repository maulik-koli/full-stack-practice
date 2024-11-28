import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const AuthRoot = () => {
    return (
        <>
            <header>
                <h1>Header here</h1>
                <nav>
                    <li><NavLink to='/'>Profile</NavLink></li>
                    <li><NavLink to='/edit'>Edit</NavLink></li>
                    <li><NavLink to='/auth/signin'>SignIn</NavLink></li>
                    <li><NavLink to='/auth/login'>LogIn</NavLink></li>
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default AuthRoot
