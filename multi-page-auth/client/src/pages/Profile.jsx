import React from 'react'
import { redirect, useRouteLoaderData } from 'react-router-dom'

const Profile = () => {
    const { user } = useRouteLoaderData('profile')

    if(!user){
        redirect('/auth/login')
    }
    
    return (
        <section>
            <h1>Profile</h1>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </section>
    )
}

export default Profile
