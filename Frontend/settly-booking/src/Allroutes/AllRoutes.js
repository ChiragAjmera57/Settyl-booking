import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Detail from '../page/Detail'
import Signup from '../page/Signup'
import Login from '../page/Login'
import Private from '../components/Private'
import Protected from '../components/Private'
import UserProfile from '../page/UserProfile'
import CreateEvent from '../page/CreateEvent'
import UpdateEvent from '../components/Eventpopup'

const AllRoutes = () => {
  
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/event/:id' element={
          <Protected>
            <Detail />
          </Protected>
        }/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/userdetails' element={ <UserProfile />}/>
        <Route path='/update-event/:id' element={ <UpdateEvent />}/>
    </Routes>
  )
}

export default AllRoutes