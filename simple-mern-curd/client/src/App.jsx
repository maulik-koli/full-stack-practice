import React, { useState } from "react";
import Operations from "./components/Operations";
import Results from "./components/Results";

const App = () => {
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [showUsers, setShowUsers] = useState([])

  const fetchingData = async () => {
    try{
        const response = await fetch('http://localhost:3000/users/read')
        const users = await response.json()

        if(!response.ok){
          throw new Error(response.statusText || "Something went wrong");
        }

        setShowUsers(users)
        setError(null)
    }
    catch(e){
      setError({ message: e.message });
    }
    finally{
      setIsFetching(false)
    }
  }

  return (
    <main>
      <Operations
        setError={setError}
        setIsFetching={setIsFetching}
        fetchingData={fetchingData}
        setShowUsers={setShowUsers}
      />
      <Results 
        error={error}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        showUsers={showUsers}
        fetchingData={fetchingData}
      />
    </main>
  );
};

export default App;
