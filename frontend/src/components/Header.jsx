import React from "react"
import Logo from "../assets/Untitled design (68).png"
import { NavLink } from "react-router-dom"

export default function Header() {
    const styles = {
        borderBottom: "1px solid #e3e3e3"
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    return (
        <header>
            <NavLink to="/"><img src={Logo} id="logo" alt="logo" /></NavLink>
            <nav>
                <NavLink to="publications" className="nav-btn" style={({isActive}) => isActive ? styles : null}>Publications</NavLink>
                <NavLink to="register" className="nav-btn" style={({isActive}) => isActive ? styles : null}>Register</NavLink>
                {!isLoggedIn && <NavLink to="login" className="nav-btn" style={({isActive}) => isActive ? styles : null}>Login</NavLink>}
                <NavLink to="logout" className="nav-btn" style={({isActive}) => isActive ? styles : null}>Logout</NavLink>
            </nav>
        </header>
    )
}