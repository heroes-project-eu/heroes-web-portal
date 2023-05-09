import { useContext, useCallback, useState } from "react"
import Context from "../context/UserContext"
import loginService from "../services/login"
import logoutService from "../services/logout"

export default function useUser () {
    const {jwt, org, setJWT, setOrg} = useContext(Context)
    const [state , setState] = useState({ loading:false, error: false, logout: false })

    const login = useCallback(({ username, organization, password }) => {
        setState({ loading:true, error:false, logout: false })
        loginService({ username, organization, password })
            .then(res => {
                window.sessionStorage.setItem("jwt", JSON.stringify(res[0]))
                window.sessionStorage.setItem("org", res[1])
                setState({ loading:false, error:false })
                setJWT(res[0])
                setOrg(res[1])
            })
        .catch(err => {
            window.sessionStorage.removeItem("jwt")
            window.sessionStorage.removeItem("org")
            setState({ loading:false, error:true, logout:false })
            console.error(err)
        })
    }, [setJWT, setOrg])

    const logout = useCallback(() => {
        logoutService()
        .then(res => {
            console.log("logout from heroes successfully")
            setState({ loading:false, error:false, logout:true })
        })
        .catch(err => {
            console.error(err)
            setState({ loading:false, error:false, logout:false })
        })
        window.sessionStorage.removeItem("jwt")
        window.sessionStorage.removeItem("org")
        setJWT(null)
        setOrg(null)
    }, [setJWT, setOrg])


    return {
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        isLogout: state.logout,
        login,
        logout,
        jwt,
        org
    }
}