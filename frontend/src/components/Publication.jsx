import React from "react"
import { Form, Link, useLocation } from "react-router-dom"
import defaultProfileImage from "../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png";

export default function Publication(props) {
    const location = useLocation()
    const pathName = location.pathname
    const [commentFormOnOff, setCommentFormOnOff] = React.useState(false)
    const profileLoggedIn = props.profileLoggedIn

    const [message2, setMessage2] = React.useState("")
    const [showMessage2, setShowMessage2] = React.useState(false)

    const [replyFormOnOff, setReplyFormOnOff] = React.useState(false)

    React.useEffect(() => {
        profileLoggedIn.message ? setMessage2("You need to be logged in") : ""
    }, [profileLoggedIn])

    const commentForm = <div className="comment-form">
        <Form onSubmit={() => setCommentFormOnOff(false)} method="post">
            <textarea type="text" name="comment" id="comment"></textarea>
            <input type="hidden" name="publicationId" id="publicationId" value={props.id} />
            <div className="buttons">
                <button>Comment</button>
                <div className="cancel-btn" onClick={() => setCommentFormOnOff(false)}><i className="fa-solid fa-x" title="Cancel"></i></div>
            </div>
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

                {location.pathname === "/publications" ?
                    <Link to={`detail/${props.id}`}>
                        <div className="pub-content">
                            <h2>{props.title}</h2>
                            <p>{props.text}</p>
                        </div>
                    </Link> :
                    <div className="pub-content">
                        <h2>{props.title}</h2>
                        <p>{props.text}</p>
                    </div>
                }

                {location.pathname === "/publications" ?
                    <Link to={`detail/${props.id}`}>
                        <div className="pub-img">
                            <img src={props.pubImg} alt="Publication image" />
                        </div>
                    </Link> :
                    <div className="pub-img">
                        <img src={props.pubImg} alt="Publication image" />
                    </div>
                }

                <div className="engagement">
                    <div className="inner-engagement-container">
                        <button onClick={props.like}>
                            {props.pLiked ? <i className="fa-solid fa-thumbs-up" title="Dislike"></i> : <i className="fa-regular fa-thumbs-up" title="Like"></i>}
                        </button>
                        <p>Likes: {props.likes}</p>
                        <div>|</div>
                        <button id="comment-btn" onClick={() => {
                            if (profileLoggedIn.message) {
                                setShowMessage2(true)
                                setCommentFormOnOff(false)
                            } else {
                                setShowMessage2(false)
                                setCommentFormOnOff(true)
                            }
                        }}><i className="fa-solid fa-comment"></i></button>
                        <p>Comments: {props.commentsCount}</p>
                        {props.message ? <p id="message">{props.message}</p> : null}
                        {showMessage2 && !props.message ? <p id="message">{message2}</p> : null}
                    </div>
                    {commentFormOnOff && commentForm}
                    {props.comments}
                </div>
            </div>
        </div>
    )
}