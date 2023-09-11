import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const initial = {
    name: "",
    email: "",
    password: "",
  };
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
      "https://settyl-event-booking2.onrender.com/signup",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response, "error");
        }
        return response.json();
      })
      .then((data) => {
        // Access the data from the response here
        if (data.msg == "invalid input") {
          console.log("invalid m aaya");
          // toast.error('Email already registered!', { autoClose: 3000 });
          toast.warn("Email already registered!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.log("succes m aaya");
          // toast.success('Registered Succesfully',{autoClose:3000});
          toast.success("User registered successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setData(initial)
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
        });
      });
      setBtnLoading(false)
  };
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form className="signup-form" method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={userData.name}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={userData.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={userData.password}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">{btnLoading?"Loading...":"Sign up"}</button>
        </form>
        <p>already have an account <Link to={`/login`}>login here</Link> </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
