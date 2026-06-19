import React from "react"
import { getPublications } from "../../utils"
import { Outlet } from "react-router-dom"
import Publication from "../../components/Publication"

export default function Publications() {
    return (
        <div className="wall-publications-container">
            <h1>Publications</h1>
            <div className="outer-container">
                <div className="inner-container">
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}