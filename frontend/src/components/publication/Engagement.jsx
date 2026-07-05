import React from "react"
import { Form } from "react-router"

export default function Engagement(props) {
    const [showCommentFormOnOff, setShowCommentFormOnOff] = React.useState(false)

    const commentForm = <Form className="comment-form" method="post">
        <input type="text" name="comment" id="comment" autoComplete="off" />
        <input type="hidden" name="id" id="id" value={props.id} />
        <button>Comment</button>
    </Form>

    return (
        <div className="engagement-container">
            <div className="engagement-icons">
                <i className="fa-regular fa-thumbs-up"></i>
                <i className="fa-solid fa-comment" onClick={() => setShowCommentFormOnOff(!showCommentFormOnOff)}></i>
                {props.message && <p id="message">{props.message}</p>}
            </div>

            {showCommentFormOnOff && commentForm}
        </div>
    )
}