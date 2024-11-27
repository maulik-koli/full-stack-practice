import { redirect } from "react-router-dom"

const BASE_URL = "http://localhost:3000/"

export const action = async (url, request) => {
    const data = await request.formData()
    const expectedFields = ['name', 'email', 'password']

    const resData = {}
    expectedFields.forEach(field => {
        const value = data.get(field)
        if (value) resData[field] = value
    })

    const response = await fetch(BASE_URL+url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resData)
    })
    console.log(response)

    if(!response.ok){
        return response
    }
    return redirect('/')
}

export const loader = (url) => {
    
}
