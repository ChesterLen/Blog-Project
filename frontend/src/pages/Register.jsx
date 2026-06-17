import React from "react"
import { Form, useActionData } from "react-router-dom"
import { getCookie } from "../utils"

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password1 = formData.get("password1")
    const password2 = formData.get("password2")

    if (password1 !== password2) {
        return {message: "Passwords don't match!"}
    }

    try {
        const resCookie = await fetch("http://localhost:8000/api/cookie/", {
            credentials: "include"
        })
    } catch {
        throw new Error("An error occured")
    }

    const res = await fetch("http://localhost:8000/api/register/", {
        method: "post",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie()
        },
        body: JSON.stringify({ email, password1, password2 })
    })

    const data = await res.json()
    console.log(data)

    if (!res.ok) {
        throw {
            message: "An error occured",
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export default function Register() {
    const actionData = useActionData()
    
    return (
        <div className="register-container">
            <h1>Register</h1>
            <Form method="post">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" name="password1" id="password1" required />

                <label htmlFor="password2">Repeat password:</label>
                <input type="password" name="password2" id="password2" required />
                <button>Register</button>
            </Form>
        </div>
    )
}