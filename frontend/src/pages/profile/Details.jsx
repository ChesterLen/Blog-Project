import React from "react"
import ImgUrl from "../../assets/ChatGPT Image May 23, 2026, 08_23_04 PM.png"

export default function Details() {
    return (
        <div className="profile-container">
            <div className="profile-details">
                <div className="img-names">
                    <div className="profile-img">
                        <img src={ImgUrl} alt="" />
                    </div>
                    <div className="names">
                        <h1>Chester</h1>
                        <h1>Stifter</h1>
                    </div>
                </div>
                <p>dsadasdasdas</p>
            </div>
        </div>
    )
}