import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function Settings() {
    return (
        <div className="profile-settings-container">
            <div className="settings">
                <div className="settings-nav">
                    <NavLink to="">Profile</NavLink>
                    <NavLink to="account">Account</NavLink>
                </div>
                <div className="edit">
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}