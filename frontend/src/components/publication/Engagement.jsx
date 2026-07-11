import React from "react"
import { Form } from "react-router"
import { getCookie, getLoggedInProfile, like, getLikes } from "../../utils"

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
            <button className="cmt-btn">Comment</button>
        </Form>
        <button className="cancel-btn" onClick={() => setShowCommentFormOnOff(false)}><i className="fa-solid fa-x"></i></button>
    </div>

    return (
        <div className="engagement-container">
            <div className="engagement-icons">
                <i className={`${liked ? "fa-solid" : "fa-regular"} fa-thumbs-up`} onClick={async () => {
                    if (!props.isLoggedIn) {
                        setMessage("You need to be logged in")
                        return
                    }

                    const pubLike = await like(props.id, "Publication", props.isLoggedIn)
                    setpubLikesCount(pubLike.likes)
                    setLikes(await getLikes())
                }}></i>
                <i className="fa-solid fa-comment" title="Comment" onClick={() => {
                    if (!props.isLoggedIn) {
                        setMessage("You need to be logged in")
                        return
                    }
                    setShowCommentFormOnOff(true)
                }}></i>
                {liked && <p className="liked">{pubLikesCount} <i className="fa-solid fa-thumbs-up"></i></p>}
                {message && <p id="message">{message}</p>}
            </div>

            {showCommentFormOnOff && commentForm}

            <div className="comments">
                {props.comments}
            </div>
        </div>
    )
}