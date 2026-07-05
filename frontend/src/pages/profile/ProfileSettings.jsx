import React from "react"
import { NavLink, Outlet } from "react-router"

export default function Settings() {
    const styles = {
        backgroundColor: "#000"
    }

    return (
        <div className="profile-settings-container">
            <div className="settings">
                <div className="settings-nav">
                    <NavLink to="" style={({isActive}) => isActive ? styles : null} end>Profile</NavLink>
                    <NavLink to="account" style={({isActive}) => isActive ? styles : null}>Account</NavLink>
                </div>
                <div className="edit">
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}