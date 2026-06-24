import React from "react"

export default function Publication(props) {
    return (
        <div className="publication">
            <div className="profile">
                <div className="profile-content">
                    <div className="prf-img">
                        <img src={props.profileImg} alt="Publication profile image" />
                    </div>
                    <p>{props.firstName}</p>
                </div>
            </div>

            <div className="pub-content">
                <h2>{props.title}</h2>
                <p>{props.text}</p>
            </div>
            <div className="pub-img">
                <img src={props.pubImg} alt="Publication imgage" />
            </div>

            <div className="engagement">
                <button onClick={props.like}>
                    <i className="fa-solid fa-thumbs-up"></i>
                </button>
                <p>Likes: {props.likes}</p>
                <p>Comments: 0</p>
            </div>
        </div>
    )
}