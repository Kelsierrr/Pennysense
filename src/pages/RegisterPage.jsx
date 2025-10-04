import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Pennylogo.png";
import Picture3 from "../assets/Picture3.png";
import "../styles/RegisterPage.css";
import API from "../utils/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Registerpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
  e.preventDefault();
  try {
    const res = await API.post("/auth/register", { email, password, name });
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ force reload to fetch expenses post-registration
    window.location.href = "/dashboard";
  } catch (err) {
    console.error("Register failed:", err.response?.data || err.message);
    alert("Registration failed. Try again.");
  }
}


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
            <Link to="/" className="btn">Login</Link>
            <Link to="/register" className="btn active">Register</Link>
          </div>
          <p>Track your daily, weekly and yearly expenses effortlessly</p>
        </div>

        <form className="loginForm2" onSubmit={handleRegister}>
          <div className="inputGroup2">
            <label htmlFor="email-address">Email Address</label>
            <input
              type="email"
              id="email-address"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup2">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup2">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-icon2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="inputGroup2">
            <label htmlFor="Referral-Code">Referral Code (optional)</label>
            <input type="text" id="Referral-Code" placeholder="Enter a Referral Code" />
          </div>

          <div className="loginBtnContainer2">
            <button type="submit" className="button2">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registerpage;
