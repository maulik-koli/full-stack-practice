import React, { useRef, useState } from "react";

const Operations = ({ setError, setIsFetching, fetchingData, setShowUsers }) => {
    const nameIp = useRef()
    const ageIp = useRef()
    const idIp = useRef()

    const [ message, setMessage ] = useState('')

    const handleCreate = async () => {
        setIsFetching(true)

        const enterUser = {
            name : nameIp.current.value,
            age : ageIp.current.value
        }

        try{
            const response = await fetch('http://localhost:3000/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(enterUser)
            })

            if(!response.ok){
                throw new Error(response.statusText || "Something went wrong");
            }

            const result = await response.json()
            setMessage(result.message)
            setError(null)
        }
        catch(e){
            setError({ message: e.message });
        }
        finally{
            setIsFetching(false)
            nameIp.current.value = ''
            ageIp.current.value = ''
        }
    }

    const handleReadById = async () => {
        const id = idIp.current.value
        const url = `http://localhost:3000/users/${id}`

        try{
            const response = await fetch(url)
            
            if(!response.ok){
                throw new Error(response.statusText || "Something went wrong");
            }

            const user = await response.json()
            setShowUsers([user])
            setError(null)
        }
        catch(e){
            console.log(e)
            setError({ message: e.message });
        }
        finally{
            setIsFetching(false)
            idIp.current.value = ''
        }
    }

    const handleUpdate = async () => {
        setIsFetching(true)
        const id = idIp.current.value
        const name = nameIp.current.value.length !== 0 ? nameIp.current.value : undefined
        const age = ageIp.current.value.length !== 0 ? ageIp.current.value : undefined
        const url = `http://localhost:3000/users/${id}`

        const enterUpdateUser = {};
        if (name !== undefined) enterUpdateUser.name = name;
        if (age !== undefined) enterUpdateUser.age = age;

        try{
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(enterUpdateUser)
            })

            if(!response.ok){
                throw new Error(response.statusText || "Something went wrong");
            }

            const result = await response.json()
            setMessage(result.message)
            setError(null)
        }
        catch(e){
            setError({ message: e.message });
        }
        finally{
            nameIp.current.value = ''
            ageIp.current.value = ''
            idIp.current.value = ''
            setIsFetching(false)
        }
    }

    const handleDelete = async () => {
        setIsFetching(true)
        const id = idIp.current.value
        const url = `http://localhost:3000/users/${id}`

        try{
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(!response.ok){
                throw new Error(response.statusText || "Something went wrong");
            }

            const result = await response.json()
            setMessage(result.message)
            setError(null)
        }
        catch(e){
            setError({ message: e.message });
        }
        finally{
            setIsFetching(false)
            idIp.current.value = ''
        }
    }

    return (
        <div className="ope">
            <div className="inputs">
                <input ref={nameIp} type="text" placeholder="name" />
                <input ref={ageIp} type="number" placeholder="age" />
                <input ref={idIp} type="text" placeholder="id" />
            </div>
            <div className="btns">
                <button onClick={handleCreate}>Create</button>
                <button onClick={fetchingData}>Read All</button>
                <button onClick={handleReadById}>Read by Id</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default Operations;
