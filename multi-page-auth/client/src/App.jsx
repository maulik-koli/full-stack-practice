import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './pages/Root'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Signin from './pages/Signin'
import Login from './pages/Login'
import { action, loader, userAction } from './api/api'
import { authLoadder } from './utils/auth'
import AuthRoot from './pages/AuthRoot'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: authLoadder,
    errorElement: <p>error</p>,
    children: [
      {
        index: true,
        element: <Profile />,
        loader: async () => await loader('user/me'),
        id: 'profile',
      },
      {
        path: 'edit',
        element: <EditProfile />,
        action: async ({ request }) => {
          return await userAction(`user/`, request, request.method)
        }
      },
    ]
  },
  {
    path: 'auth',
    element: <AuthRoot />,
    children: [
      {
        path: 'signin',
        element: <Signin />,
        action: async ({request}) => await action('user/singup', request, 'POST')
      },
      {
        path: 'login',
        element: <Login />,
        action: async ({request}) => await action('user/login', request, 'POST')
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
