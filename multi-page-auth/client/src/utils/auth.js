import { redirect } from "react-router-dom"

export const setCookies = (name, value) => {
    const d = new Date()
    d.setTime(d.getTime() + (60 * 60 * 1000))
    const expires = 'expires=' + d.toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires};`
}

export const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)

    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift())
    }
    return undefined
}

export const authLoadder = () => {
    return getCookie('token')
} 

export const deleteCookie = (name, path = '/') => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`
}
