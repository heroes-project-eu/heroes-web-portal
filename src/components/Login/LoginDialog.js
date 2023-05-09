import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
//import { ToastContainer, toast } from 'react-toastify';
import { LILogin, LIForm, LIDiv, LIButton, 
         LIInput, LITitle, LIError } from './styles';
import Logo from './heroes-logo.png'


const LoginDialog = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [organization, setOrganization] = useState("")
    const { isLoginLoading, hasLoginError, login, isLogged } = useUser()

    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault()
      login({ username, organization, password })
      //if (hasLoginError) toast.error("invalid credentials")
    }

    const renderForm = (
      <>
       <LIForm onSubmit={handleSubmit}>
          <LITitle><img src={Logo} alt="logo" width="175" /></LITitle>
          <LIDiv>
            <label>Username </label>
            <LIInput 
              type="text" 
              placeholder="username"
              onChange={(u) => setUsername(u.target.value)} 
              value={username}
              required 
            />
          </LIDiv>
          <LIDiv>
            <label>Organization </label>
            <LIInput 
              type="text" 
              placeholder="organization"
              onChange={(o) => setOrganization(o.target.value)} 
              value={organization}
              required 
            />
          </LIDiv>
          <LIDiv>
            <label>Password </label>
            <LIInput 
              type="password" 
              placeholder="password"
              onChange={(p) => setPassword(p.target.value)}
              value={password}
              required 
            />
            { isLoginLoading && <p>Checking credentials...</p> } 
            { hasLoginError && <LIError>Invalid credentials</LIError> } 
          </LIDiv>
           <LIButton>Log in to HEROES platform</LIButton>
        </LIForm> 
      {/*  <ToastContainer />  */}
      </>
    )
  
    return (
      <LILogin>
          {isLogged ? <Navigate to="/home" />: renderForm}
      </LILogin>
    )
}

export default LoginDialog