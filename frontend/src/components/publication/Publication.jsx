import React from "react"
import { Form, Link, useLocation } from "react-router"
import defaultProfileImage from "../../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"

export default function Publication(props) {
    const location = useLocation()
    const pathName = location.pathname

    return (
        <div className="publication">
            <div className="inner-p-container">
                <Link to={`../profile/details/${props.profileId}`} className="profile">
                    <div className="profile-content">
                        <div className="prf-img">
                            <img src={props.profileImg} alt="Publication profile image" />
                        </div>
                        <p>{props.firstName} {props.lastName}</p>
                    </div>
                </Link>

                {pathName === "/publications" ?
                    <div className="inner-eng-container">
                        <Link to={`detail/${props.id}`}>
                            <div className="pub-content">
                                <h2>{props.title}</h2>
                                <p>{props.text}</p>
                            </div>

                            <div className="pub-img">
                                <img src={props.pubImg} alt="Publication image" />
                            </div>

                        </Link>
                        {props.engagement}
                    </div> :
                    <div className="pub-data">
                        <div className="pub-content">
                            <h2>{props.title}</h2>
                            <p>{props.text}</p>
                        </div>

                        <div className="pub-img">
                            <img src={props.pubImg} alt="Publication image" />
                        </div>

                        {props.engagement}
                    </div>
                }
            </div>
        </div>
    )
}