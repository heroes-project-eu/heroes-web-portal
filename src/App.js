import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { GlobalStyle } from './styles/globalStyles'
import Layout from './components/Layout/Layout'
import AltLayout from './components/Layout/AltLayout'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import NewJobs from './pages/NewJob'
import JobDetails from './components/Jobs/JobDetails'
import Data from './pages/Data'
import Terminal from './pages/Terminal'
import Login from './pages/Login'
import ListObjects from './components/Minio/ListObjects'
import { UserContextProvider } from './context/UserContext'

const App = () => {

  return (
    // <React.StrictMode>
    <UserContextProvider>
    <Router>
        <GlobalStyle />
        <>
          <Routes>
              <Route exact path="/" element={<AltLayout><Login /></AltLayout>}/>
              <Route exact path="/home" element={<Layout><Home /></Layout>}/>               
              <Route exact path="/workflows" element={<Layout><Jobs /></Layout>}/>
              <Route exact path="/workflows/new" element={<Layout><NewJobs /></Layout>}/> 
              <Route exact path="/data" element={<Layout><Data /></Layout>}/>
              <Route exact path="/visualization" element={<Layout><Terminal /></Layout>}/>
              <Route exact path="/data/list-objects/:bucketName" element={<Layout><ListObjects/></Layout>}/> 
              <Route exact path="/workflows/:job_id" element={<Layout><JobDetails/></Layout>}/> 
              <Route exact path="/data/list-objects/:bucketName/:obj_name" element={<Layout><ListObjects/></Layout>}/> 
              {/* <Route path={`${this.props.match.url}/:bucketName/:obj_name`} element={<Layout><ListObjects/></Layout>}/>  */}
              <Route exact path="/logout" element={<Layout><ListObjects/></Layout>}/> 
           </Routes>
        </>
    </Router>
    </UserContextProvider>
    // </React.StrictMode>
  )
}

export default App