import React, { useEffect } from 'react'
import { Navigate, NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom'

const Root = () => {
    const token = useLoaderData()
    const navigate = useNavigate()

    useEffect(() => {
        if(!token) {
            navigate('/auth/login')
        }
    }, [token])

    if(!token) {
        return <Navigate to='/auth/login' replace />
    }

    return (
        <>
            <header>
                <h1>Header here</h1>
                <nav>
                    <li><NavLink to='/'>Profile</NavLink></li>
                    <li><NavLink to='/edit'>Edit</NavLink></li>
                    {!token && <li><NavLink to='/auth/signin'>SignIn</NavLink></li>}
                    {!token && <li><NavLink to='/auth/login'>LogIn</NavLink></li>}
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default Root
