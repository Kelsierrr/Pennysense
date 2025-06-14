import { useState } from "react";
import logo from "../assets/Pennylogo.png";
import picture1 from "../assets/picture1.png";
import "../styles/LoginPage.css";
import{ Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Loginpage() {
  const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="Loginpage1">
          <div className="Loginleft1">
            <img src={picture1} alt="" />
          </div>
      
          <div className="loginRight1">
            <div className="logocontainer1">
               <img className="logo1" src={logo} alt="" />
            </div>
            <div className="centerline1"> 
                <p>Welcome to Pennysense</p>
               <div className="loginButtons1">
               <Link to="/"        className="btn active">Login</Link>
                <Link to="/register" className="btn">Register</Link>
                          </div>

                     <p>Simplify your expense tracking and gain full control of your finances.</p>
            </div>
            

           
      
            <div className="loginForm1">
              <div className="inputGroup1">
                <label htmlFor="username">Username</label>
                  <input type="text" id="username" placeholder="Enter your Username" />
              </div>
                <div className="inputGroup1">
                    <label htmlFor="password">Password</label>
                      <input type= {showPassword ? 'text' : 'password'} id="password" placeholder="Enter your Password" />
                      <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                </div>

              
      
              <div className="loginOptions1">
                <label className="checkbox-wrapper">
                <input type="checkbox" className="hidden-checkbox" />
                <span className="custom-checkbox"></span>
                Remember me
                </label>
                <Link to = "/recoverpassword" className="password-rec">Forgot Password?</Link>
              </div>
                
              <div className="loginBtnContainer1">
                  <button>Login</button>
                </div>

            </div>
          </div>
        </div>
      );
      
}

export default Loginpage;