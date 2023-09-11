import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const initial = {
    name:"",
    date:"",
    description:"",
    location:"",
    price:"",
}

const UpdateEvent = () => {
  const {id} = useParams()
    const [userData,setUserData] = useState(initial)
    const [btnLoading,setBtn] = useState(false)
    

    const handleChange =(e) =>{
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(userData);
        setBtn(true)
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authentication":localStorage.getItem('token_chirag')
      },
      body: JSON.stringify(userData),
    };
        try {
          await fetch(`https://settyl-event-booking2.onrender.com/event-update/${id}`,
          requestOptions
          ).then((res)=>{
            if(!res.ok){
              throw new Error(`something went wrong`)
            }
            return res.json()
          })
          .then((data)=>{
            console.log(data);
            setBtn(false)
            setUserData(initial)

            toast.success('Event Updated succesfully 🎉🎉', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          })
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }); 
        }

    }
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authentication":localStorage.getItem('token_chirag')
          },
        };
        const res = await fetch(`https://settyl-event-booking2.onrender.com/event/${id}`,requestOptions);
        const {event} = await res.json();
        console.log(event);
        setUserData(event)

      } catch (error) {
        console.log(error);
      }
    };
    useEffect(()=>{
      fetchData()
    },[])

  return (
    <div className="wrapper">
  <h1>Update Event</h1>
  <form onSubmit={handleSubmit}>
    <label htmlFor="eventName">Event Name:</label>
    <input type="text" id="eventName" name="name" required value={userData.name} onChange={(e)=>handleChange(e)}/>

    <label htmlFor="eventDate">Date:</label>
    <input type="date" id="eventDate" name="date" required value={userData.date} onChange={(e)=>handleChange(e)} />

    <label htmlFor="eventLocation">Location:</label>
    <input type="text" id="eventLocation" name="location" value={userData.location} required onChange={(e)=>handleChange(e)} />

    <label htmlFor="eventDescription">Description:</label>
    <textarea id="eventDescription" name="description" required value={userData.description} onChange={(e)=>handleChange(e)}></textarea>

    
    <label htmlFor="eventPrice">Price:</label>
    <input type="number" id="eventPrice" name="price" required value={userData.price} onChange={(e)=>handleChange(e)} />

    <button type="submit">{btnLoading?"Loading...":"Update Event"}</button>
  </form>
  <ToastContainer />
</div>

  )
}

export default UpdateEvent