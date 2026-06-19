import React from "react"
import { Link } from "react-router-dom"

export default function Publication(props) {
    return (
        <Link to={String(props.id)} className="publication">
            <h2>{props.title}</h2>
            <p>{props.text}</p>
        </Link>
    )
}