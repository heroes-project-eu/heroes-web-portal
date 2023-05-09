import React from 'react'
import { Navigate } from 'react-router-dom'
import NewJob from '../components/Jobs/NewJob'
import useUser from '../hooks/useUser'

const NewJobs = () => {

  const { isLogged } = useUser()

  return (
    <>
    {isLogged ?
    <> 
    <h1>New Job</h1>
    <NewJob />
    </>
    : <Navigate to="/" />}

    </>
  )
}

export default NewJobs