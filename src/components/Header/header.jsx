import { Link } from 'react-router-dom';
import './Header.css';
import logo from "./Pennylogo.png";

export default function Header() {
    return(
        <header className='header'>
        <nav>
            <Link to="/" className = "header-link">Logout</Link> 
        </nav>
    <img className="logo1" src={logo} alt="" />
        </header>
    );
}