import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserEvents = () => {
const [userData,setData] = useState(null)
const[loading,setloading] = useState(false)
const navigate = useNavigate()
    const fetchData = async()=>{
        setloading(true)
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authentication":localStorage.getItem('token_chirag')
            },
          };
          const res = await fetch(`https://settyl-event-booking2.onrender.com/created-events`,requestOptions)
          .then((response)=>{
            if(!response.ok){
                throw new Error(`something went wrong`)
            }
            return response.json()
          }).then((data)=>{
            setData(data.eventFound)
            setloading(false)
          })
    }
    useEffect(()=>{
        fetchData()
    },[])
    console.log(userData);
  return (
    <div>
         <header>
        <h1>User Created Events</h1>
    </header>
    <div className="container">
       {
        loading?(<h1>Loading...</h1>): 
            userData?.map((ele,idx)=>{
                return(
                    <div key={idx} className="event-card" onClick={()=>navigate(`/update-event/${ele._id}`)}>
            <h2>{ele.name}</h2>
            <p>Date: {ele.date}</p>
            <p>Location: {ele.location}</p>
            <p>Description: {ele.description}</p>
        </div>
                )
            })
        
       }
        
        
        
    </div>
    </div>
  )
}

export default UserEvents