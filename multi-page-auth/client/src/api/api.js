import { redirect } from "react-router-dom"
import { setCookies, getCookie, deleteCookie } from "../utils/auth"

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

    if(!response.ok){
        return response
    }
    const resData = await response.json()
    setCookies('token', resData.token)
    return redirect('/')
}

export const userAction = async (url, request, method) => {
    let redirectUrl = '/profile'
    if(request.method === 'PATCH') url+='update'
    if(request.method === 'POST') {
        url+='logout'
        redirectUrl='/auth/login'
    }
    if(request.method === 'DELETE') {
        url+='delete'
        redirectUrl='/auth/signin'
    }

    const token = getCookie('token')
    if(!token){
        return redirect('/auth/login')
    }

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
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reqData)
    })

    if(!response.ok){
        return response
    }
    
    if(method === 'POST' || method === 'DELETE'){
        deleteCookie('token')
        return redirect(redirectUrl)
    }
    else{
        return response
    }
}

export const loader = async (url) => {
    const token = getCookie('token')

    if(!token){
        return redirect('/auth/login')
    }

    const response = await fetch(BASE_URL+url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    if(!response.ok){
        const errorData = await response.json()
        return ({ message: "Could not fetch user." }, { status: errorData.status })
    }
    else{
        const resData = await response.json()
        return resData
    }
}
