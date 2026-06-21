import React from "react"
import { Link } from "react-router-dom"
import defaultProfileImg from "../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"

export default function Publication(props) {
    const styles = {
        border: "1px solid rgb(22, 207, 22)",
        borderColor: "rgb(22, 207, 22)",
    }

    const profile = localStorage.getItem("profile")

    return (
        <Link to={String(props.id)} className="publication" style={props.profile == profile ? styles : null}>
            <div className="pub-profile">
                <div className="pub-profile-img">
                    <img src={props.profileImg ? props.profileImg : defaultProfileImg} alt="profile image" />
                </div>
                <p>{props.firstName}</p>
            </div>
            <div className="pub-content">
                {props.imgSrc && <div className="pub-img">
                    <img src={props.imgSrc} alt="publication image" />
                </div>}
                <h2>{props.title}</h2>
                <p>{props.text}</p>
            </div>
        </Link>
    )
}