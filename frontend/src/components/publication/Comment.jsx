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

    const replyForm = <div className="comment-form">
        <Form onSubmit={() => setShowReplyFormOnOff(prev => ({ ...prev, [comment.id]: false }))} method="post">
            <input type="text" name="comment" id="comment" autoComplete="off" />
            <input type="hidden" name="id" id="id" value={id} />
            <input type="hidden" name="parent" id="parent" value={comment.id} />
            <button>Comment</button>
        </Form>
        <button className="cancel-btn" onClick={() => setShowReplyFormOnOff(prev => ({ ...prev, [comment.id]: false }))}><i className="fa-solid fa-x"></i></button>
    </div>

    return (
        <div className="comment" key={comment.id}>
            <div className="cmt-prf">
                <img src={profile.profile_image ? profile.profile_image : defaultProfileImage} className="cmt-prf-img" alt="Author's profile image" />
                <div className="cmt-prof-data">
                    <p>{profile.first_name} {profile.last_name}</p>
                    <p>{comment.comment}</p>
                </div>
            </div>
            <div className="cmt-engagement">
                <div className="engagement-icons">
                    <i className={`${liked ? "fa-solid" : "fa-regular"} fa-thumbs-up`} onClick={async () => {
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
                    {liked && <p className="liked">{cmtLikesCount} <i className="fa-solid fa-thumbs-up"></i></p>}
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