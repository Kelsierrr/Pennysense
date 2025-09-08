import { useState } from "react";
import logo from "../assets/Pennylogo.png";
import Picture3 from "../assets/Picture3.png";
import "../styles/RegisterPage.css";
import{ Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Registerpage() {
  const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="Loginpage2">
          <div className="Loginleft2">
            <img src={Picture3} alt="" />
          </div>
      
          <div className="loginRight2">
            <div className="logocontainer2">
               <img className="logo" src={logo} alt="" />
            </div>
            <div className="centerline2"> 
                <p>Create your Pennysense account</p>
               <div className="loginButtons2">
               <Link to="/"        className="btn">Login</Link>
                <Link to="/register" className="btn active">Register</Link>
                          </div>

                     <p>Track your daily, weekly and yearly expenses effortlessly</p>
            </div>
            

           
      
            <div className="loginForm2">
              <div className="inputGroup2" >
                <label htmlFor="email-address">Email Address</label>
                  <input type="text" id="email-address2" placeholder="Enter your Email Address" />
                </div>
              <div className="inputGroup2" >
                <label htmlFor="username">Username</label>
                  <input type="text" id="username2" placeholder="Enter your Username" />
                </div>
                <div className="inputGroup2" >
                      <label htmlFor="password">Password</label>
                      <input type= {showPassword ? 'text' : 'password'} id="password2" placeholder="Enter your Password" />
                      <span className="password-icon2" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                  </div>
                
                <div className="inputGroup" >
                  <label htmlFor="Referral-Code">Referral Code (optional)</label>
                        <input type="text" id="Referral-Code" placeholder="Enter a Referral Code" />
                </div>
              
                
              <div className="loginBtnContainer2">
              <Link to="/dashboard" className="button2">Register</Link>
                </div>

            </div>
          </div>
        </div>
      );
      
}

export default Registerpage;