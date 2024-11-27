import { createContext } from "react";

const ErrorFetchContext = createContext()

const ErrorFetchProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    return (
        <ErrorFetchProvider.Provider value={{ error, setError, isFetching, setIsFetching }}>
            {children}
        </ErrorFetchProvider.Provider>
    )
}

exports = {
    ErrorFetchContext,
    ErrorFetchProvider
}
