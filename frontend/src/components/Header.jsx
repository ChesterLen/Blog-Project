import React from "react"
import Logo from "../assets/Untitled design (68).png"

export default function Header() {
    return (
        <header>
            <img src={Logo} id="logo" alt="logo" />
            <nav>
                <div className="nav-btn">Products</div>
                <div className="nav-btn">About</div>
                <div className="nav-btn">Contacts</div>
            </nav>
        </header>
    )
}