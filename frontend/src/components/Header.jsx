import React from "react"
import Logo from "../assets/Untitled design (68).png"
import { NavLink } from "react-router-dom"

export default function Header() {
    const styles = {
        borderBottom: "1px solid #e3e3e3"
    }

    return (
        <header>
            <NavLink to="/"><img src={Logo} id="logo" alt="logo" /></NavLink>
            <nav>
                <NavLink to="publications" className="nav-btn" style={({isActive}) => isActive ? styles : null}>Publications</NavLink>
                <NavLink to="register" className="nav-btn" style={({isActive}) => isActive ? styles : null}>Register</NavLink>
                <div to="login" className="nav-btn">Login</div>
            </nav>
        </header>
    )
}