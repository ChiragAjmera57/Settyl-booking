import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';



const initial = {
  email: "",
  password:""
};
const Login = () => {

  const state = useContext(AppContext)
  const navigate = useNavigate()
  const {store,renderData} = state
  const [userData, setData] = useState(initial);
  const [btnLoading,setBtnLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    await fetch(
      "https://settyl-event-booking2.onrender.com/login",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response, "error");
        }
        return response.json();
      })
      .then (async(data) => {
        if(data.msg=='login successfull'){
            
            await localStorage.setItem('token_chirag',data.token)
            await localStorage.setItem('isLogin_chirag',true)
          navigate('/')
          
        }
        else if(data.msg=='invalid input'){
            toast.error("Invalid credentials", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        // console.log(store);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
        });
      });
      setBtnLoading(false)
  };


  return (
    <div className="login-container">
        <div className="login-card">
            <h2>Login</h2>
            <form className="login-form" method='POST' onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" required value={userData.email} onChange={(e)=>handleChange(e)} />
                <input type="password" name="password" placeholder="Password" required value={userData.password} onChange={(e)=>handleChange(e)}/>
                <button type="submit">{btnLoading?"Loading....":"Log in"}</button>
            </form>
            <p>don't have an account <Link to={`/signup`}>register</Link></p>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login