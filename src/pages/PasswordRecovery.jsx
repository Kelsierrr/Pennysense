// import { useState } from "react";
import logo from "../assets/Pennylogo.png";
import picture2 from "../assets/Picture2.png";
import "../styles/PasswordRecovery.css";
import{ Link } from "react-router-dom";


function PasswordRecovery() {
    return (
        <div className="Loginpage3">
          <div className="Loginleft3">
            <img src={picture2} alt="" />
          </div>
      
          <div className="loginRight3">
            <div className="logocontainer3">
               <img className="logo3" src={logo} alt="" />
            </div>
            <div className="centerline3"> 
                <p className="PR">Password Recovery</p>
                     <p>Don't worry, we'll help you get back on track.</p>
                     <p className="enter">Enter your registered email address.</p>
            </div>
            

            <div className="loginForm3">
              <div className="inputGroup3" >
                <label htmlFor="email-address">Email Address</label>
                  <input type="text" id="email-address3" placeholder="Enter your Email Address" />
                </div>
                
              <div className="loginBtnContainer3">
              <Link to="/resetpassword" className="button">Continue</Link>
                
                </div>

            </div>
          </div>
        </div>
      );
      
}

export default  PasswordRecovery;