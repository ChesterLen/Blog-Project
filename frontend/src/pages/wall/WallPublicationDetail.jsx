import React from "react"
import { getPublication } from "../../utils"
import { useLoaderData, Link } from "react-router-dom"

export async function loader({ params }) {
    const data = await getPublication(params.id)
    return data
}

export default function WallPublicationDetail() {
    const publication = useLoaderData()
    return (
        <div className="publication-detail-container">
            <Link to=".." className="back-btn" title="go back"><i className="fa-solid fa-angle-left"></i></Link>
            <div className="publication">
                <h2>{publication.title}</h2>
                <p>{publication.text}</p>
            </div>
        </div>
    )
}