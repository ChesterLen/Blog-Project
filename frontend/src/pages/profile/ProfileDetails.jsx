import React from "react"
import defaultProfileImg from "../../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"
import BubbleStatusUrl from "../../assets/ChatGPT Image Jun 21, 2026, 10_56_45 AM (1) (1).png"
import { Form, useLoaderData, Outlet } from "react-router"

export async function action({ request }) {
    const formData = await request.formData()
    const pubImg = formData.get("publication-img")
    const title = formData.get("title")
    const text = formData.get("text")
    
    const newFormData = new FormData()
    if (pubImg) {
        newFormData.append("image", pubImg)
    }
    
    newFormData.append("title", title)
    newFormData.append("text", text)

    const res = await fetch("http://localhost:8000/api/users/list")
    const data = await res.json()

    const email = localStorage.getItem("email")
    const user = data.find(u => u.email === email)
    const profile = user.userprofile

    newFormData.append("profile", profile)

    const res2 = await fetch("http://localhost:8000/api/publication/create/", {
        method: "post",
        body: newFormData
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
    const profileImg = loaderData.profile_image
    const firstName = loaderData.first_name
    const lastName = loaderData.last_name
    const status = loaderData.status

    const publicationForm = <Form onSubmit={() => setPostOnOf(false)} method="post" encType="multipart/form-data">
        <div className="pub-img">
            <input type="file" name="publication-img" id="publication-img" />
        </div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />

        <label htmlFor="text">Text</label>
        <textarea name="text" id="text" required />

        <button>Post</button>
    </Form>

    return (
        <div className="profile-container">
            {<p>{localStorage.getItem("email")}</p>}
            <div className="profile-details">
                <div className="img-names">
                    <div className="profile-img">
                        <img src={profileImg ? profileImg : defaultProfileImg} alt="" />
                    </div>
                    <div className="names">
                        {firstName ? <h1>{firstName}</h1> : <p>Not filled in...</p>}
                        {lastName ? <h1>{lastName}</h1> : <p>Not filled in...</p>}
                    </div>
                </div>
                <div className="buble">
                    <img src={BubbleStatusUrl} alt="bubble-status-image" id="bubble-s-img" />
                    {status ? <p className="status-p">{status}</p> : <p className="status-p">...</p>}
                </div>
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