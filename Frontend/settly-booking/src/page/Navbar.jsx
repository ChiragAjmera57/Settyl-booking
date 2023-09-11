import React from "react";
import logo from "../images/logo2.avif";
import accountLogo from "../images/accountLogo.png";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const toAuth = () => {
    navigate("/signup");
  };
  return (
    <nav>
      <div className="navContainer">
        <Link to={`/`}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </Link>
    
        <div className="accountLogo">
          {!localStorage.getItem("isLogin_chirag") ||
          localStorage.getItem("isLogin_chirag") == null ? (
            <button className="nav-login-btn" onClick={() => toAuth()}>
              Sign up
            </button>
          ) : (
           
              <img onClick={()=>navigate('/userdetails')} src={accountLogo} alt="accountLogo" />
            
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
