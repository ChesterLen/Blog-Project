import React from "react"
import { data, Form, useActionData, useNavigate, useSearchParams } from "react-router"
import { getCookie } from "../utils"

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    const csrfToken = getCookie()

    try {
        const res = await fetch("http://localhost:8000/api/users/list")
        const data = await res.json()
        let user
        if (data.length > 0) {
            if (data.find(u => u.email === email)) {
                user = data.find(u => u.email === email)
                if (!user.is_active) {
                    return "Please activate your account first"
                }
            } else {
                return "Wrong credentials"
            }
        }

        const res2 = await fetch("http://localhost:8000/api/login/", {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({ email, password })
        })

        const data2 = await res2.json()
        if (data2.error) {
            return "Wrong credentials."
        }
        window.location.href = "/"
    } catch (err) {
        return err
    }
}

export default function Login() {
    const actionData = useActionData()
    const [searchParams, setSearchParams] = useSearchParams()
    const accActivatedMessage = searchParams.get("message") || null
    
    return (
        <div className="login-container">
            <h1>Login</h1>
            {actionData && <p className="error">{actionData.toString()}</p>}
            {accActivatedMessage && <p className="message">{accActivatedMessage}</p>}
            <Form onSubmit={(e) => e.preventDefault} method="post">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" required />

                <button>Login</button>
            </Form>
        </div>
    )
}