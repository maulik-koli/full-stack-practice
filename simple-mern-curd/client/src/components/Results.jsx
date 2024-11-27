import React, { useEffect } from 'react'

const Results = ({ error, isFetching, setIsFetching, showUsers, fetchingData }) => {

    useEffect(() => {
        setIsFetching(true)
        fetchingData()
    }, [])

    return (
        <div className='res'>
            {isFetching ? <p>Loading...</p> :
                error ? <p>{error.message}</p> :
                <ul>
                    {showUsers.map((user) => (
                        <li key={user._id}>
                            <p id='for-id'>{user._id}</p>
                            <p>{user.name}</p>
                            <p>{user.age}</p>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Results;
