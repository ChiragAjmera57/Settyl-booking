import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../store/store'
import { ToastContainer, toast } from 'react-toastify'

const Detail = () => {
    const {id} = useParams()
    const state = useContext(AppContext)
    const {store,renderData} = state
    const handleBooking = async()=>{
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authentication":localStorage.getItem('token_chirag')
          },
        };
        await fetch(
          `https://settyl-event-booking2.onrender.com/event-register/${id}`,
          requestOptions
        )
          .then((response) => {
            if (!response.ok) {
            }
            return response.json();
          }).then((data)=>{
            if(data.msg=="event registerd"){
              toast.success('Event registered 🎉', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
            else{

            }
            
          })
      } catch (error) {
      }
    }
    const fetchData = async () => {
        renderData("fetchLoading")
        try {
          const res = await fetch(`https://settyl-event-booking2.onrender.com/event/${id}`);
          const {event} = await res.json();
          renderData("fetchsucces",event)
        } catch (error) {
          renderData("fetcherror")
        }
      };
      useEffect(()=>{
        fetchData()
      },[])
      if(store.isError)return (<h1>Something went wrong</h1>)
  return (
   
    

    store.isLoading?(<h1>Loading</h1>): <div className="event-container">
    <img className="event-image" src={store.data.image} alt="Event Image" />
    <div className="event-details">
        <h1>{store.data.name}</h1>
        <p>{store.data.date}</p>
        <p>{store.data.location}</p>
        <p>{store.data.description}</p>
    </div>
    <div className="event-price">
        Price: {store.data.price}
    </div>
    <div className="btn-box">

    <button className='nav-login-btn'  onClick={()=>handleBooking()}>Book Ticket</button>
    <ToastContainer />
    </div>
</div>
    
  
   
  )
}

export default Detail