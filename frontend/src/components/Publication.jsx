import React from "react"
import { Link } from "react-router-dom"

export default function Publication(props) {
    const styles = {
        border: "1px solid rgb(22, 207, 22)",
        borderColor: "rgb(22, 207, 22)",
    }

    const profile = localStorage.getItem("profile")

    return (
        <Link to={String(props.id)} className="publication" style={props.profile == profile ? styles : null}>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
        </Link>
    )
}