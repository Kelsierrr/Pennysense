import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Pennylogo.png";
import Picture1 from "../assets/Picture1.png";
import "../styles/LoginPage.css";
import API from "../utils/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

async function handleLogin(e) {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", { email, password });
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ force reload so ExpenseContext re-fetches with token
    window.location.href = "/dashboard";
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    alert("Login failed. Check credentials.");
  }
}

  return (
    <div className="Loginpage1">
      <div className="Loginleft1">
        <img src={Picture1} alt="" />
      </div>

      <div className="loginRight1">
        <div className="logocontainer1">
          <img className="logo1" src={logo} alt="" />
        </div>
        <div className="centerline1">
          <p>Welcome to Pennysense</p>
          <div className="loginButtons1">
            <Link to="/" className="btn active">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </div>
          <p>Simplify your expense tracking and gain full control of your finances.</p>
        </div>

        <form className="loginForm1" onSubmit={handleLogin}>
          <div className="inputGroup1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup1">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
            <Link to="/recoverpassword" className="password-rec">Forgot Password?</Link>
          </div>

          <div className="loginBtnContainer1">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
