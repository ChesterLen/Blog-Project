import React from "react"
import ImgUrl from "../../assets/ChatGPT Image May 23, 2026, 08_23_04 PM.png"
import { Form, useLoaderData, Outlet } from "react-router-dom"
import Publication from "../../components/Publication"

export async function action({ request }) {
    const formData = await request.formData()
    const title = formData.get("title")
    const text = formData.get("text")

    const res = await fetch("http://localhost:8000/api/users/list")
    const data = await res.json()

    const email = localStorage.getItem("email")
    const user = data.find(u => u.email === email)
    const profile = user.userprofile

    const res2 = await fetch("http://localhost:8000/api/publication/create/", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, text, profile })
    })

    const data2 = await res2.json()
    return data2
}

export async function loader({ params }) {
    const profileId = params.id
    const res = await fetch(`http://localhost:8000/api/profile/${profileId}`)
    const data = await res.json()
    return data
}

export default function Details() {
    const [postOnOf, setPostOnOf] = React.useState(false)
    const loaderData = useLoaderData()
    const firstName = loaderData.first_name
    const lastName = loaderData.last_name
    const status = loaderData.status

    const publicationForm = <Form onSubmit={() => setPostOnOf(false)} method="post">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />

        <label htmlFor="text">Text</label>
        <textarea name="text" id="text" required />

        <button>Post</button>
    </Form>

    return (
        <div className="profile-container">
            <div className="profile-details">
                <div className="img-names">
                    <div className="profile-img">
                        <img src={ImgUrl} alt="" />
                    </div>
                    <div className="names">
                        {firstName ? <h1>{firstName}</h1> : <p>Not filled in...</p>}
                        {lastName ? <h1>{lastName}</h1> : <p>Not filled in...</p>}
                    </div>
                </div>
                {status ? <p>{status}</p> : <p>Not filled in...</p>}
            </div>
            <div className="publications-container">
                <h1>Publications</h1>
                <button onClick={() => setPostOnOf(prevPostOnOf => !prevPostOnOf)}>Post Publication</button>
                {postOnOf && publicationForm}
                <div>
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}