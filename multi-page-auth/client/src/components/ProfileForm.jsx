import React from 'react'
import { Form, useNavigation } from 'react-router-dom'

const ProfileForm = ({isLogin, method}) => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <div>
            <Form method={method} >
            {!isLogin && <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" defaultValue='' required />
                </div>}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email"  defaultValue='' required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" defaultValue='' required />
                </div>
                <button>{isSubmitting ? 'Submitting...' : 'save'}</button>
            </Form>
        </div>
    )
}

export default ProfileForm
