import React from "react"
import { Form, useActionData } from "react-router-dom"
import { getCookie } from "../utils"

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    console.log(email)
    
    const res = await fetch("http://localhost:8000/api/login/", {
        method: "post",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie()
        },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
        throw {
            message: "An error occured. Please try again later.",
            statusText: res.statusText,
            status: res.status
        }
    }

    window.location.href = "/"
}

export default function Login() {

    return (
        <Form method="post">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />

            <button>Login</button>
        </Form>
    )
}