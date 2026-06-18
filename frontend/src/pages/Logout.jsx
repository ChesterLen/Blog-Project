import React from "react"
import { useNavigate } from "react-router-dom"
import { getCookie } from "../utils"

export default function Logout() {
    const navigate = useNavigate()

    async function handleLogout() {
        const res = await fetch("http://localhost:8000/api/logout/", {
            method: "post",
            credentials: "include",
            headers: {
                "X-CSRFToken": getCookie()
            }
        })

        localStorage.clear()

        navigate("/")
    }

    handleLogout()
}