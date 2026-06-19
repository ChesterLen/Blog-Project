import React from "react"
import { Form } from "react-router-dom"

export async function action({ request }) {
    const formData = await request.formData()
    const title = formData.get("title")
    const text = formData.get("text")

    console.log(title, text)
}

export default function PublicationCreate() {
    return (
        <Form method="post">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" required />

            <label htmlFor="text">Text</label>
            <textarea name="text" id="text" required />

            <button>Post</button>
        </Form>
    )
}