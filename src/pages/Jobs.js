import React from 'react'
import { Navigate } from 'react-router-dom'
import JobList from '../components/Jobs/JobList'
import useUser from '../hooks/useUser'

const Jobs = () => {

  const { isLogged } = useUser()

  return (
    <>
    {isLogged ? 
    <JobList />
    : <Navigate to="/" />}

    </>
  )
}

export default Jobs