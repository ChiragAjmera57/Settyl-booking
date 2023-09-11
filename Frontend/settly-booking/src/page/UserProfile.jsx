import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import EventList from "../components/EventArr";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import CreateEvent from "./CreateEvent";
import UserEvents from "./UserEvents";

const UserProfile = () => {
  const [userProfile, setprofile] = useState(null);
  const [linkEvent, setlinkEvent] = useState([]);
  const [loading,setloading] = useState(false)
  const[profilePage,setprofilePage] = useState(true)
  const[createPage,setCreatePage] = useState(false)
  const[yourEvent,setYourEvent] = useState(false)

 const navigate = useNavigate()
  const handleProfile = async () => {
    setloading(true)
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authentication: localStorage.getItem("token_chirag"),
        },
      };
      await fetch(
        `https://settyl-event-booking2.onrender.com/user-data`,
        requestOptions
      )
        .then((response) => {
          if (!response.ok) {
            toast.error("Something went wrong!", {
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
          return response.json();
        })
        .then((data) => {
          setprofile(data.foundUser);
          setlinkEvent(data.linkedEvent);
        });
    } catch (error) {
      toast.error("Something went wrong!", {
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
     setloading(false)
  };


 

    
  useEffect(() => {
    handleProfile();
    
  
  }, [profilePage,createPage,yourEvent]);

  
  const eventIds = linkEvent?.map(obj => obj.eventId);


  return (
    
    <div className="container">
       <div className="button-wrapper">
  <button className="profile-button" onClick={() => {
    setprofilePage(true);
    setCreatePage(false);
    setYourEvent(false);
  }}>Profile</button>
  <button className="create-event-button" onClick={() => {
    setprofilePage(false);
    setCreatePage(true);
    setYourEvent(false);
  }}>Create Event</button>
  <button className="your-events-button" onClick={() => {
    setprofilePage(false);
    setCreatePage(false);
    setYourEvent(true);
  }}>Your Events</button>
  <button className="your-events-button" onClick={() => {
    localStorage.clear();
    navigate('/')
  }}>Log out</button>
  
</div>


{profilePage ? (
  <Profile loading={loading} userProfile={userProfile} eventIds={eventIds} />
) : createPage ? (
  <CreateEvent />
) :yourEvent?(<UserEvents />)
:<></>
}

        
   
  </div>
  );
};

export default UserProfile;
