import { redirect } from "react-router-dom"
import { setCookies, getCookie } from "../utils/auth"

const BASE_URL = "http://localhost:3000/"

export const action = async (url, request, method) => {
    const data = await request.formData()
    const expectedFields = ['name', 'email', 'password']

    const reqData = {}
    expectedFields.forEach(field => {
        const value = data.get(field)
        if (value) reqData[field] = value
    })

    const response = await fetch(BASE_URL+url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData)
    })
    console.log(response)

    if(!response.ok){
        return response
    }
    const resData = await response.json()
    setCookies('token', resData.token)
    return redirect('/')
}

export const loader = async (url) => {
    const token = getCookie('token')

    if(!token){
        return redirect('login')
    }

    const response = await fetch(BASE_URL+url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    console.log(response)

    if(!response.ok){
        return ({ message: "Could not fetch user." }, { status: 500 })
    }
    else{
        const resData = await response.json()
        return resData
    }
}
