import React from 'react'
import { Form, useNavigation } from 'react-router-dom'

const ProfileForm = ({isLogin, method, isEdit}) => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <div>
            <Form method={method} >
            {!isLogin && <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" defaultValue='' required={!isEdit} />
                </div>}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email"  defaultValue='' required={!isEdit} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" defaultValue='' required={!isEdit} />
                </div>
                <button type="submit">{isSubmitting ? 'Submitting...' : 'save'}</button>
            </Form>
            {isEdit && (
                <>
                    <Form method="POST"><button type="submit">Logout</button></Form>
                    <Form method="DELETE"><button type="submit">Dlete Acoount</button></Form>
                </>
            )}
        </div>
    )
}

export default ProfileForm
