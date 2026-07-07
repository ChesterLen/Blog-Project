import React from "react"
import { Form } from "react-router"

export default function Engagement(props) {
    const [showCommentFormOnOff, setShowCommentFormOnOff] = React.useState(false)
    const [message, setMessage] = React.useState("")

    const commentForm = <div className="comment-form">
        <Form onSubmit={() => setShowCommentFormOnOff(false)} method="post">
            <input type="text" name="comment" id="comment" autoComplete="off" />
            <input type="hidden" name="id" id="id" value={props.id} />
            <button>Comment</button>
        </Form>
        <button className="cancel-btn" onClick={() => setShowCommentFormOnOff(false)}><i className="fa-solid fa-x"></i></button>
    </div>

    return (
        <div className="engagement-container">
            <div className="engagement-icons">
                <i className="fa-regular fa-thumbs-up" onClick={() => {
                    if (!props.isLoggedIn) {
                        setMessage("You need to be logged in")
                        return
                    }
                }}></i>
                <i className="fa-solid fa-comment" title="Comment" onClick={() => {
                    if (!props.isLoggedIn) {
                        setMessage("You need to be logged in")
                        return
                    }
                    setShowCommentFormOnOff(true)
                }}></i>
                {message && <p id="message">{message}</p>}
            </div>

            {showCommentFormOnOff && commentForm}

            <div className="comments">
                {props.comments}
            </div>
        </div>
    )
}