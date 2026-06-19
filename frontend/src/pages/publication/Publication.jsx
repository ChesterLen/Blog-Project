import React from "react"

export default function Publication(props) {
    return (
        <div className="publication">
            <h2>{props.title}</h2>
            <p>{props.text}</p>
        </div>
    )
}