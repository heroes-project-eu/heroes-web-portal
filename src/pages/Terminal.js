import React from 'react'
import { Navigate } from 'react-router-dom'
import Interactive from '../components/Interactive/Interactive'
import useUser from '../hooks/useUser'

const Terminal = () => {

  const { isLogged } = useUser()

  return (
    <>
    { isLogged ?
    < Interactive /> 
    : <Navigate to="/" /> }
    </>
  )
}

export default Terminal