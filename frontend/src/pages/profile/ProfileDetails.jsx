import React from "react"
import ImgUrl from "../../assets/ChatGPT Image May 23, 2026, 08_23_04 PM.png"
import { Form, useLoaderData } from "react-router-dom"
import Publication from "../publication/Publication"

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
    console.log(data2)
}

export async function loader() {
    const res = await fetch("http://localhost:8000/api/publication/list")
    const data = await res.json()
    return data
}

export default function Details() {
    const [postOnOf, setPostOnOf] = React.useState(false)
    const loaderData = useLoaderData()
    const [publications, setPublications] = React.useState(loaderData.reverse())
    
    React.useEffect(() => {
        setPublications(prevPublications => loaderData.reverse())
    }, [loaderData])

    const renderPublications = publications.map(publication => <Publication key={publication.id} title={publication.title} text={publication.text} />)

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
                        <h1>Chester</h1>
                        <h1>Stifter</h1>
                    </div>
                </div>
                <p>dsadasdasdas</p>
            </div>
            <div className="publications-container">
                <h1>Publications</h1>
                <button onClick={() => setPostOnOf(prevPostOnOf => !prevPostOnOf)}>Post Publication</button>
                {postOnOf && publicationForm}
                <div className="publications">
                    {publications && renderPublications}
                </div>
            </div>
        </div>
    )
}