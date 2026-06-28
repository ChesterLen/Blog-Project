import React from "react"
import Publication from "../components/Publication"
import { 
    getPublications, 
    getPublication, 
    getProfiles, 
    getProfile, 
    getLikes, 
    getCookie, 
    getLoggedInProfile, 
    getComments, 
    getCommentLikes 
} from "../utils"
import { useLoaderData } from "react-router-dom"
import defaultProfileImage from "../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"

export async function loader({ params }) {
    const publication = await getPublication(params.id)
    const publications = await getPublications()
    const profiles = await getProfiles()
    const likes = await getLikes()
    const profileLoggedIn = await getLoggedInProfile()
    const comments = await getComments()
    const commentLikes = await getCommentLikes()
    return { 
        publications: publications, 
        publication: publication, 
        profiles: profiles, 
        likes: likes, 
        profileLoggedIn: profileLoggedIn, 
        comments: comments, 
        commentLikes: commentLikes }
}

export default function PublicationDetail() {
    const loaderData = useLoaderData()
    const publications = loaderData.publications
    const publication = loaderData.publication
    const profiles = loaderData.profiles
    const likes = loaderData.likes
    const profileLoggedIn = loaderData.profileLoggedIn

    const comments = loaderData.comments
    const publicationComments = comments.filter(c => c.publication === publication.id)
    const commentLikes = loaderData.commentLikes

    const [publicationsState, setPublicationsState] = React.useState(publications)
    const [likesState, setLikesState] = React.useState(likes)

    const [commentsState, setCommentsState] = React.useState(comments)

    const [message, setMessage] = React.useState({})

    React.useEffect(() => {
        profileLoggedIn.message ? setMessage(profileLoggedIn) : {}
    }, [profileLoggedIn])

    async function like(id) {
        const csrfToken = getCookie()

        const res = await fetch(`http://localhost:8000/api/publication/like/${id}/`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({ publicationId: id, profileId: profileLoggedIn.profile_logged_in })
        })

        const data = await res.json()

        if (profileLoggedIn.message) {
            setMessage(data)
            return
        }

        setLikesState(await getLikes())

        setPublicationsState(prevPublications => prevPublications.map(publication => {
            if (publication.id === id && !likesState.find(l => l.profile === profileLoggedIn.profile_logged_in)) {
                return { ...publication, likes: data.likes }
            } else if (publication.id === id && likesState.find(l => l.profile === profileLoggedIn.profile_logged_in)) {
                return { ...publication, likes: data.likes }
            }
            return publication
        }))
    }

    async function commentLike(id) {
        const res = await fetch(`http://localhost:8000/api/comment/like/${id}/`, {
            method: "post",
            credentials: "include",
            headers: {
                "X-CSRFToken": getCookie(),
            }
        })

        const data = await res.json()
        
        setCommentsState(prevComments => prevComments.map(c => {
            if (c.id === id && !commentsState.find(c => c.profile_commented === profileLoggedIn.profile_logged_in)) {
                return {...c, likes: data.likes}
            } else if (c.id === id && commentsState.find(c => c.id === id && data.profile_liker === profileLoggedIn.profile_logged_in)) {
                return {...c, likes: data.likes}
            }

            return c
        }))
    }

    const renderPublicationComments = publicationComments.map(c => {
        const profileCommented = profiles.find(p => p.id === c.profile_commented)
        const profileCommentedImage = profileCommented.profile_image
        const profileCommentedFirstName = profileCommented.first_name
        const profileCommentedLastName = profileCommented.last_name
        const commentLikesCount = commentsState.find(l => l.id === c.id).likes
        const comment = c.comment
        
        return (
            <div className="comment-container" key={c.id}>
                <div className="comment-and-edit">
                    <div className="comment">
                        <div className="comment-profile">
                            <img src={profileCommentedImage ? profileCommentedImage : defaultProfileImage} className="prf-cmt-img" />
                            <div className="cmt-names">
                                <p className="prf-cmt-fn">{profileCommentedFirstName}</p>
                                <p className="prf-cmt-ln">{profileCommentedLastName}</p>
                            </div>
                        </div>
                        <div className="comment-cmt">
                            <p className="cmt-txt">{comment}</p>
                            <div className="cmt-engagement">
                                <button className="cmt-like-btn" onClick={() => commentLike(c.id)}><i className="fa-solid fa-thumbs-up"></i></button>
                                <button className="cmt-rpl"><i className="fa-solid fa-reply"></i></button>
                                {commentLikesCount > 0 ? <p className="cmt-likes">{commentLikesCount} <i className="fa-solid fa-thumbs-up"></i></p> : <p className="cmt-likes"></p>}
                            </div>
                        </div>
                    </div>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        )
    })

    const renderPublication = <Publication
        key={publication.id}
        id={publication.id}
        profileImg={profiles.find(profile => profile.id == publication.profile).profile_image ? profiles.find(profile => profile.id == publication.profile).profile_image : defaultProfileImage}
        profileLoggedIn={profileLoggedIn}
        firstName={profiles.find(profile => profile.id == publication.profile).first_name}
        title={publication.title}
        text={publication.text}
        pubImg={publication.image}
        like={() => like(publication.id)}
        likes={publicationsState.find(p => p.id == publication.id).likes}
        commentsCount={comments.filter(c => c.publication === publication.id).length}
        pLiked={likesState.find(l => l.profile == profileLoggedIn.profile_logged_in && publication.id === l.publication) ? true : false}
        message={publication.id === message.publication_id ? message.message : null}
        comments={renderPublicationComments}
    />

    return (
        <>
            {renderPublication}
        </>
    )
}