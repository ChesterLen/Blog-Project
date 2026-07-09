import React from "react"
import { Form } from "react-router"
import { getCookie, getLoggedInProfile, getLikes } from "../../utils"

export default function Engagement(props) {
    const [showCommentFormOnOff, setShowCommentFormOnOff] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [pubLikesCount, setpubLikesCount] = React.useState(props.pubLikesCount)
    const [likes, setLikes] = React.useState(props.likes)

    const liked = likes.find(l => l.profile_liker === Number(props.isLoggedIn)) || null

    const commentForm = <div className="comment-form">
        <Form onSubmit={() => setShowCommentFormOnOff(false)} method="post">
            <input type="text" name="comment" id="comment" autoComplete="off" />
            <input type="hidden" name="id" id="id" value={props.id} />
            <button>Comment</button>
        </Form>
        <button className="cancel-btn" onClick={() => setShowCommentFormOnOff(false)}><i className="fa-solid fa-x"></i></button>
    </div>

    async function like() {
        const res = await fetch("http://localhost:8000/api/like/", {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie()
            },
            body: JSON.stringify({id: props.id, "className": "Publication", "profileId": props.isLoggedIn})
        })
        const data = await res.json()
        setpubLikesCount(data.likes)
        setLikes(await getLikes())
    }

    return (
        <div className="engagement-container">
            <div className="engagement-icons">
                <i className={`${liked ? "fa-solid" : "fa-regular"} fa-thumbs-up`} onClick={() => {
                    if (!props.isLoggedIn) {
                        setMessage("You need to be logged in")
                        return
                    }

                    like()
                }}></i>
                <i className="fa-solid fa-comment" title="Comment" onClick={() => {
                    if (!props.isLoggedIn) {
                        setMessage("You need to be logged in")
                        return
                    }
                    setShowCommentFormOnOff(true)
                }}></i>
                <p>Likes: {pubLikesCount}</p>
                {message && <p id="message">{message}</p>}
            </div>

            {showCommentFormOnOff && commentForm}

            <div className="comments">
                {props.comments}
            </div>
        </div>
    )
}