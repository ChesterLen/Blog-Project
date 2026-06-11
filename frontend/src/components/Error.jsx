import React from "react"
import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()

    return (
        <div className="error-container">
            <pre>{error.message}</pre>
            <pre>{error.statusText}</pre>
            <pre>{error.status}</pre>
        </div>
    )
}