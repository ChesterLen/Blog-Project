import React from "react"
import Logo from "../assets/Untitled design (68).png"
import { NavLink } from "react-router"
import { getLoggedInProfile } from "../utils"

export default function Header(props) {
    async function setCookies() {
        try {
            const resCookie = await fetch("http://localhost:8000/api/cookie/", {
                credentials: "include"
            })
        } catch {
            throw new Error("An error occured")
        }
    }

    setCookies()

    const styles = {
        borderBottom: "1px solid #e3e3e3"
    }

    return (
        <header>
            <NavLink to="/"><img src={Logo} id="logo" alt="logo" /></NavLink>
            <nav>
                <NavLink to="publications" className="nav-btn" style={({ isActive }) => isActive ? styles : null}>Publications</NavLink>
                {!props.isLoggedIn && <NavLink to="register" className="nav-btn" style={({ isActive }) => isActive ? styles : null}>Register</NavLink>}
                {!props.isLoggedIn && <NavLink to="login" className="nav-btn" style={({ isActive }) => isActive ? styles : null}>Login</NavLink>}
                {props.isLoggedIn &&
                    <div className="drp-d-m">
                        <i className="fa-solid fa-user-gear"></i>
                        <div className="drp-d-content">
                            <NavLink to={`profile/details/${props.profileId}`} className="drp-d-btn">profile</NavLink>
                            <NavLink to={`profile/settings/${props.profileId}`} className="drp-d-btn">settings</NavLink>
                            <NavLink to="logout" className="drp-d-btn">Logout</NavLink>
                        </div>
                    </div>
                }
            </nav>
        </header>
    )
}