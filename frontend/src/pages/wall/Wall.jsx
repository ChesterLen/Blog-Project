import React from "react"
import Publication from "../../components/publication/Publication"
import Engagement from "../../components/publication/Engagement"
import Comment from "../../components/publication/Comment"
import { useLoaderData } from "react-router"
import { getPublications, getProfiles, getLoggedInProfile, getCookie, getComments, getReplies, getLikes } from "../../utils"
import defaultProfileImage from "../../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"

export async function action({ request }) {
    const formData = await request.formData()
    const comment = formData.get("comment")
    const publication = formData.get("id")
    const profileLoggedIn = await getLoggedInProfile()
    const author = profileLoggedIn.profile_logged_in

    const res = await fetch(`http://localhost:8000/api/comment/create/`, {
        method: "post",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie()
        },
        body: JSON.stringify({ comment, author, publication })
    })

    const data = await res.json()
    console.log(data)
    return data
}

export async function loader() {
    const publications = await getPublications()
    const profiles = await getProfiles()
    const profileLoggedIn = await getLoggedInProfile()
    const comments = await getComments()
    const replies = await getReplies()
    const likes = await getLikes()
    return { publications, profiles, profileLoggedIn, comments, replies, likes }
}

export default function Publications() {
    const { publications, profiles, profileLoggedIn, comments, replies, likes } = useLoaderData()
    const isLoggedIn = profileLoggedIn.profile_logged_in || null

    const [publicationsState, setPublicationsState] = React.useState(publications)
    const [commentsState, setCommentsState] = React.useState(comments)
    const [repliesState, setRepliesState] = React.useState(replies)

    const renderPublications = publicationsState.map(publication => {
        const profile = profiles.find(p => p.id === publication.profile)

        return (
            <Publication
                key={publication.id}
                id={publication.id}
                profileImg={profile.profile_image ? profile.profile_image : defaultProfileImage}
                firstName={profile.first_name}
                lastName={profile.last_name}
                title={publication.title}
                text={publication.text}
                pubImg={publication.image}
                engagement={
                    <Engagement
                        id={publication.id}
                        isLoggedIn={isLoggedIn}
                        likes={likes}
                        pubLikesCount={publication.likes}
                    />
                }
            />
        )
    }
    )

    return (
        <div className="wall-publications-container">
            <div className="outer-container">
                <div className="inner-container">
                    {renderPublications}
                </div>
            </div>
        </div>
    )
}