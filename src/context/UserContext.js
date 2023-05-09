import React, { useState } from 'react'

const Context = React.createContext({})

export function UserContextProvider({children}) {
    const [jwt, setJWT] = useState(
        () => window.sessionStorage.getItem("jwt")
    )
    const [org, setOrg] = useState(
        () => window.sessionStorage.getItem("org")
    )

    return <Context.Provider value={{
        jwt,
        setJWT,
        org,
        setOrg
    }}>
        {children}
    </Context.Provider>
}

export default Context