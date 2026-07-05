import React from "react"
import { getCookie } from "../utils"

export default function Logout() {
    async function handleLogout() {
        const res = await fetch("http://localhost:8000/api/logout/", {
            method: "post",
            credentials: "include",
            headers: {
                "X-CSRFToken": getCookie()
            }
        })
        
        window.location.href = "/"
    }

    handleLogout()
}