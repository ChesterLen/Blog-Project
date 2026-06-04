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
                <div className="nav-btn">Products</div>
                <NavLink to="about" className="nav-btn" style={({isActive}) => isActive ? styles : null}>About</NavLink>
                <div className="nav-btn">Contacts</div>
            </nav>
        </header>
    )
}