import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

const Profile = () => {
    const { user } = useRouteLoaderData('profile')
    
    return (
        <section>
            <h1>Profile</h1>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </section>
    )
}

export default Profile
