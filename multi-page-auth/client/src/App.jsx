import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './pages/Root'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Signin from './pages/Signin'
import Login from './pages/Login'
import { action, loader } from './api/api'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Profile />,
        loader: async () => await loader('user/me'),
        id: 'profile',
      },
      {
        path: 'edit',
        element: <EditProfile />
      },
      {
        path: 'signin',
        element: <Signin />,
        action: async ({request}) => await action('user/singup', request, 'POST')
      },
      {
        path: 'login',
        element: <Login />
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
