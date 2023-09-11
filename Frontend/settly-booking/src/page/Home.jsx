import React, { useContext, useEffect } from "react";
import AppProvider, { AppContext } from "../store/store";
import Card from "../components/Card";
import Signup from "./Signup";
import Login from "./Login";

const Home = () => {
  const state = useContext(AppContext);
  const{renderData} = state
  const fetchData = async () => {
    renderData("fetchLoading")
    try {
      const res = await fetch(`https://settyl-event-booking2.onrender.com/`);
      const {events} = await res.json();
      renderData("fetchsucces",events)
    } catch (error) {
      renderData("fetcherror")
    }
  };
  useEffect(()=>{
    fetchData()
    console.log(localStorage.getItem('isLogin_chirag'));
  },[])
   
  
const {store} = state
const { store: { data } } = state;

  if(store.isError)return(<h1>Something went wrong</h1>)
  return (
    <main id="main-box">
      
        {store.isLoading ? (
  <h1>Loading</h1>
) : (
  Array.isArray(data) ? (
    data.map((ele, idx) => (
      <Card key={idx} id={ele._id} img={ele.image} name={ele.name} description={ele.description} date={ele.date} />
    ))
  ) : (
    <p>Retry</p>
  )
)}

      
    </main>
  );
};

export default Home;
