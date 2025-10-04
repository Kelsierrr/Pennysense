import { Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import logo from "./Pennylogo.png";

export default function Header() {
    const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

    return(
        <header className='header'>
        <nav className="nav-links">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </nav>
    <img className="logo1" src={logo} alt="" />
        </header>
    );
}
