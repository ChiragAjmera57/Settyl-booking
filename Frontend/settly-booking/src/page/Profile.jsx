import React from 'react'
import EventList from '../components/EventArr'
import { ToastContainer } from 'react-toastify'

const Profile = ({loading,userProfile,eventIds}) => {
  return (
    <div>
        {
        loading?(<h1>Loading...</h1>):
            <>
        <h1>User Profile</h1>
        <h2>Name:</h2>
        <p id="name">{userProfile?.name}</p>
      <h2>Email:</h2>
      <p id="email">{userProfile?.email}</p>
        <h2>Events Registered:</h2>
        
       
            <EventList eventIds={eventIds} />
    
        <ToastContainer />
        </>

        }
    </div>
  )
}

export default Profile