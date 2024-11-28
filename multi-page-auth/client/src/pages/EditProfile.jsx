import React from 'react'
import ProfileForm from '../components/ProfileForm'
import { useActionData } from 'react-router-dom'

const EditProfile = () => {
  const data = useActionData()
  return (
    <div>
        <h2>Edit Profile</h2>
        <ProfileForm method='PATCH' isEdit />
        {(data && !data.error && data.message) && <p>{data.message}</p> }
    </div>
  )
}

export default EditProfile
