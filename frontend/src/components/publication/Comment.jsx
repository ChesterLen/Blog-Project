import React from "react"
import defaultProfileImage from "../../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"
import { Form } from "react-router"
import { like, getLikes } from "../../utils"

export default function Comment(props) {
    const [showReplyFormOnOff, setShowReplyFormOnOff] = React.useState({})
    const [message, setMessage] = React.useState("")

    const id = props.id
    const comment = props.comment
    const profile = props.profile
    const profiles = props.profiles
    const replies = props.replies
    const isLoggedIn = props.isLoggedIn

    const [cmtLikesCount, setCmtLikesCount] = React.useState(comment.likes)
    const [likes, setLikes] = React.useState(props.likes)
    const liked = likes.find(l => l.profile_liker === Number(isLoggedIn) && l.comment === comment.id)

    const [cmtMngMenu, setCmtMngMenu] = React.useState(false)
    const [showEditForm, setShowEditForm] = React.useState(false)
    const [commentState, setCommentState] = React.useState(comment.comment)

    const cmtManageDropdownMenu = <div className="cmt-mng-drpd-mn">
        <button id={comment.id} onClick={() => {
            setShowEditForm(!showEditForm)
            setCmtMngMenu(false)
        }}>Edit</button>
        <Form method="post">
            <input type="hidden" name="cmt-del" id="cmt-del" value={comment.id} />
            <button>Delete</button>
        </Form>
    </div>

    const cmtEditForm = <Form className="cmt-edit-form" onSubmit={() => {
        setShowEditForm(false)
        setCmtMngMenu(false)
    }} method="post">
        <input type="text" name="cmt-edit" id="cmt-edit" defaultValue={commentState} autoComplete="off" onChange={(e) => setCommentState(e.target.value)} />
        <input type="hidden" name="cmt-id" id="cmt-id" value={comment.id} />
        <button className="cmt-edit-btn">Edit</button>
        <i className="fa-solid fa-x cancel-btn" onClick={() => {
            setCmtMngMenu(false)
            setShowEditForm(false)
        }}></i>
    </Form>

    const replyForm = <div className="comment-form">
        <Form onSubmit={() => setShowReplyFormOnOff(prev => ({ ...prev, [comment.id]: false }))} method="post">
            <input type="text" name="comment" id="comment" autoComplete="off" />
            <input type="hidden" name="id" id="id" value={id} />
            <input type="hidden" name="parent" id="parent" value={comment.id} />
            <button className="cmt-btn">Comment</button>
        </Form>
        <button className="cancel-btn" onClick={() => setShowReplyFormOnOff(prev => ({ ...prev, [comment.id]: false }))}><i className="fa-solid fa-x"></i></button>
    </div>

    return (
        <div className="comment" key={comment.id}>
            <div className="cmt-prf">
                <img src={profile.profile_image ? profile.profile_image : defaultProfileImage} className="cmt-prf-img" alt="Author's profile image" />
                <div className="cmt-prof-data">
                    <p>{profile.first_name} {profile.last_name}</p>
                    {showEditForm ? cmtEditForm : <p>{comment.comment}</p>}
                </div>

                {
                    Number(isLoggedIn) === profile.id &&
                    <div className="cmt-mng">
                        <button className="cmt-mng-btn" onClick={() => {
                            setCmtMngMenu(!cmtMngMenu)
                            setShowEditForm(false)
                            setCommentState(comment.comment)
                        }}><i className="fa-solid fa-ellipsis"></i></button>
                        {cmtMngMenu && cmtManageDropdownMenu}
                    </div>
                }
            </div>
            <div className="cmt-engagement">
                <div className="engagement-icons">
                    <i className={`${liked ? "fa-solid" : "fa-regular"} fa-thumbs-up`} onClick={async () => {
                        if (!isLoggedIn) {
                            setMessage("You need to be logged in")
                            return
                        }
                        const cmtLike = await like(comment.id, "Comment", isLoggedIn)
                        setCmtLikesCount(cmtLike.likes)
                        setLikes(await getLikes())
                    }}></i>
                    <i className="fa-solid fa-reply" title="Reply" onClick={() => {
                        if (!isLoggedIn) {
                            setMessage("You need to be logged in")
                            return
                        }
                        setShowReplyFormOnOff(prev => ({ ...prev, [comment.id]: true }))
                    }}></i>
                    {cmtLikesCount > 0 && <p className="liked">{cmtLikesCount} <i className="fa-solid fa-thumbs-up"></i></p>}
                    {message && <p id="message">{message}</p>}
                </div>
                {showReplyFormOnOff[comment.id] && replyForm}
                <div className="replies">
                    {
                        replies ? replies.filter(reply => reply.parent === comment.id).map(reply => {
                            const rplProfile = props.profiles.find(profile => profile.id === reply.author)
                            return (
                                <Comment
                                    key={reply.id}
                                    id={id}
                                    comment={reply}
                                    profile={rplProfile}
                                    profiles={profiles}
                                    replies={replies}
                                    isLoggedIn={isLoggedIn}
                                    likes={likes}
                                />
                            )
                        }) :
                            null
                    }
                </div>
            </div>
        </div>
    )
}