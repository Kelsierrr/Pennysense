// import { useState } from "react";
import logo from "../assets/Pennylogo.png";
import picture2 from "../assets/Picture2.png";
import "../styles/PasswordReset.css";
import{ Link } from "react-router-dom";


function PasswordReset() {
    return (
        <div className="Loginpage4">
          <div className="Loginleft4">
            <img src={picture2} alt="" />
          </div>
      
          <div className="loginRight4">
            <div className="logocontainer4">
               <img className="logo4" src={logo} alt="" />
            </div>
            <div className="centerline4"> 
                <p className="RP">Reset Password</p>
                     <p>A reset link has been sent to your mail to reset your password.</p>
            </div>

            <div className="loginForm4">
              <div className="inputGroup4" >
                <label htmlFor="New-Password">New Password</label>
                  <input type="text" id="New-Password" placeholder="Type here" />
                </div>

                <div className="inputGroup4" >
                <label htmlFor="confirmNewPassword">Confirm New password</label>
                  <input type="text" id="confirmNewPassword" placeholder="Type here" />
                </div>
                
              <div className="loginBtnContainer4">
              <Link to="" className="button2">Reset Password</Link>
                </div>

            </div>
          </div>
        </div>
      );
      
}

export default  PasswordReset;