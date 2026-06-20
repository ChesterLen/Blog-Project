import React from "react"
import Logo from "../assets/Untitled design (68).png"
import { NavLink } from "react-router-dom"

export default function Header() {
    const profileId = localStorage.getItem("profile")

    const styles = {
        borderBottom: "1px solid #e3e3e3"
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    return (
        <header>
            <NavLink to="/"><img src={Logo} id="logo" alt="logo" /></NavLink>
            <nav>
                <NavLink to="publications" className="nav-btn" style={({ isActive }) => isActive ? styles : null}>Publications</NavLink>
                {!isLoggedIn && <NavLink to="register" className="nav-btn" style={({ isActive }) => isActive ? styles : null}>Register</NavLink>}
                {!isLoggedIn && <NavLink to="login" className="nav-btn" style={({ isActive }) => isActive ? styles : null}>Login</NavLink>}
                {isLoggedIn &&
                    <div className="drp-d-m">
                        <i className="fa-solid fa-user-gear"></i>
                        <div className="drp-d-content">
                            <NavLink to={`profile/details/${profileId}`} className="drp-d-btn">profile</NavLink>
                            <NavLink to={`profile/settings/${profileId}`} className="drp-d-btn">settings</NavLink>
                            <NavLink to="logout" className="drp-d-btn">Logout</NavLink>
                        </div>
                    </div>
                }
            </nav>
        </header>
    )
}