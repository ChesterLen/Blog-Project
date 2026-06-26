import React from "react"
import { Form } from "react-router-dom"

export default function Publication(props) {
    const [commentFormOnOff, setCommentFormOnOff] = React.useState(false)

    const commentForm = <div className="comment-form">
        <Form>
            <textarea type="text" name="comment" id="comment" rows="5" cols="15" required></textarea>
            <button>Comment</button>
        </Form>
    </div>

    return (
        <div className="publication">
            <div className="inner-p-container">
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
                <img src={props.pubImg} alt="Publication image" />
                </div>

                <div className="engagement">
                <button onClick={props.like}>
                    {props.pLiked ? <i className="fa-solid fa-thumbs-up" title="Dislike"></i> : <i className="fa-regular fa-thumbs-up" title="Like"></i>}
                </button>
                <p>Likes: {props.likes}</p>
                <div>|</div>
                <button id="comment-btn" onClick={() => setCommentFormOnOff(!commentFormOnOff)}><i className="fa-solid fa-comment"></i></button>
                <p>Comments: 0</p>
                {props.message ? <p id="message">{props.message}</p> : null}
                </div>
                {commentFormOnOff && commentForm}
            </div>
        </div>
    )
}