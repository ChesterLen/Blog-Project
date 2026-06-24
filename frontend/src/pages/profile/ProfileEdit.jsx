import React from "react"
import ImgUrl from "../../assets/ChatGPT Image May 23, 2026, 08_23_04 PM.png"
import { Form, useParams, useLoaderData } from "react-router-dom"
import { getCookie } from "../../utils"

export async function loader({ params }) {
    const profileId = params.id

    const res = await fetch(`http://localhost:8000/api/profile/${profileId}`)
    const data = await res.json()
    return data
}

export async function action({ request, params }) {
    const formData = await request.formData()
    const profileImg = formData.get("profile-img")
    const firstName = formData.get("first-name")
    const lastName = formData.get("last-name")
    const status = formData.get("status")
    const profileId = params.id
    const csrfToken = getCookie()
    
    const newFormData = new FormData()

    newFormData.append("profile_image", profileImg)
    newFormData.append("first_name", firstName)
    newFormData.append("last_name", lastName)
    newFormData.append("status", status)
    
    const res2 = await fetch(`http://localhost:8000/api/profile/update/${profileId}/`, {
        method: "post",
        headers: {
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: newFormData
    })

    const data2 = await res2.json()
    return data2
}

export default function ProfileEdit() {
    const loaderData = useLoaderData()
    const newImg = loaderData.profile_image
    const firstName = loaderData.first_name
    const lastName = loaderData.last_name
    const status = loaderData.status

    const [firstNameState, setFirstNameState] = React.useState(firstName)
    const [lastNameState, setLastNameState] = React.useState(lastName)
    const [statusState, setStatusState] = React.useState(status)
    
    return (
        <div className="profile-container">
            <div className="profile-details">
                <Form method="post" encType="multipart/form-data">
                    <div className="img-names">
                        <div className="profile-img">
                            <img src={!newImg ? ImgUrl : newImg} alt="" />
                            <input type="file" name="profile-img" id="profile-img" />
                        </div>
                        <div className="names">
                            <label htmlFor="first-name">First name:</label>
                            <input type="text" name="first-name" id="first-name" value={firstNameState} onChange={(e) => setFirstNameState(e.target.value)} />

                            <label htmlFor="last-name">Last name:</label>
                            <input type="text" name="last-name" id="last-name" value={lastNameState} onChange={(e) => setLastNameState(e.target.value)} />
                        </div>
                    </div>
                    <div className="status">
                        <label htmlFor="status">Status:</label>
                        <textarea name="status" id="status" value={statusState || ""} onChange={(e) => setStatusState(e.target.value)} />
                    </div>
                    <button>Edit</button>
                </Form>
            </div>
        </div>
    )
}