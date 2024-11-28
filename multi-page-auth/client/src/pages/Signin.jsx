import React from 'react'
import ProfileForm from '../components/ProfileForm'
import { useActionData } from 'react-router-dom'

const Signin = () => {
  const data = useActionData()

    return (
        <div>
            <h2>Registration Form</h2>
            <ProfileForm method='POST'  />
            {data && data.message && <p>{data.message}</p>}
        </div>
  )
}

export default Signin
