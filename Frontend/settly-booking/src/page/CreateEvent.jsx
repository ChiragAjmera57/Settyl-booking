import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const initial = {
    name:"",
    image:null,
    date:"",
    description:"",
    location:"",
    price:"",
    bookingDeadline:""
}

const CreateEvent = () => {
    const [userData,setUserData] = useState(initial)
const[btnLoading,setBtn] = useState(false)

    

    const handleChange =(e) =>{
        const { name, value } = e.target;
        // console.log(name);
        if(name=="image")
        {
            const file = e.target.files[0]; 
            if (file) {
              const reader = new FileReader();
        
              reader.onload = (e) => {

                 setUserData({ ...userData, [name]: e.target.result });
              };
        
              reader.readAsDataURL(file); 
            } else {
              setUserData({ ...userData, [name]: null });
            }
        }
        else{
            setUserData({ ...userData, [name]: value });
        }
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        setBtn(true)
        console.log(userData);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authentication":localStorage.getItem('token_chirag')
      },
      body: JSON.stringify(userData),
    };
        try {
          await fetch(`https://settyl-event-booking2.onrender.com/event-create`,
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
            toast.success('Event created succesfully 🎉🎉', {
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
        }

    }


  return (
    <div className="wrapper">
  <h1>Create Event</h1>
  <form onSubmit={handleSubmit}>
    <label htmlFor="eventName">Event Name:</label>
    <input type="text" id="eventName" name="name" required value={userData.name} onChange={(e)=>handleChange(e)}/>

    <label htmlFor="eventDate">Date:</label>
    <input type="date" id="eventDate" name="date" required value={userData.date} onChange={(e)=>handleChange(e)} />

    <label htmlFor="eventLocation">Location:</label>
    <input type="text" id="eventLocation" name="location" value={userData.location} required onChange={(e)=>handleChange(e)} />

    <label htmlFor="eventDescription">Description:</label>
    <textarea id="eventDescription" name="description" required value={userData.description} onChange={(e)=>handleChange(e)}></textarea>

    <label htmlFor="eventImage">Image:</label>
    <input type="file" id="eventImage" name="image" accept="image/*"  required onChange={(e)=>handleChange(e)} />

    <label htmlFor="eventPrice">Price:</label>
    <input type="number" id="eventPrice" name="price" required value={userData.price} onChange={(e)=>handleChange(e)} />

    <button type="submit">{btnLoading?"Loading...":"Create Event"}</button>
  </form>
  <ToastContainer />
</div>

  )
}

export default CreateEvent