import React from 'react'
import { Navigate } from 'react-router-dom'
import ListBuckets from '../components/Minio/ListBuckets'
import useUser from '../hooks/useUser'

const Data = () => {

  const { isLogged } = useUser()

  return (
    <>
    { isLogged ? 
    <ListBuckets />
    : <Navigate to="/" /> }
    </>
  )
}

export default Data