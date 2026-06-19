import React from "react"
import { useParams, useLoaderData, Link } from "react-router-dom"
import { getPublication } from "../../utils"

export async function loader({ params }) {
    const publicationId = params.id

    const data = getPublication(publicationId)
    return data
}

export default function PublicationDetail() {
    const data = useLoaderData()
    return (
        <div className="publication-detail-container">
            <Link to=".." className="back-btn" title="go back"><i className="fa-solid fa-angle-left"></i></Link>
            <div className="publication">
                <h2>{data.title}</h2>
                <p>{data.text}</p>
            </div>
        </div>
    )
}