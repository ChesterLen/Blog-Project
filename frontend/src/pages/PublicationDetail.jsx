import React from "react"
import Publication from "../components/Publication"
import { getPublications, getPublication, getProfiles, getProfile, getLikes, getCookie, getLoggedInProfile, getComments } from "../utils"
import { useLoaderData } from "react-router-dom"
import defaultProfileImage from "../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"

export async function loader({ params }) {
    const publication = await getPublication(params.id)
    const publications = await getPublications()
    const profiles = await getProfiles()
    const likes = await getLikes()
    const profileLoggedIn = await getLoggedInProfile()
    const comments = await getComments()
    return { publications: publications, publication: publication, profiles: profiles, likes: likes, profileLoggedIn: profileLoggedIn, comments: comments }
}

export default function PublicationDetail() {
    const loaderData = useLoaderData()
    const publications = loaderData.publications
    const publication = loaderData.publication
    const profiles = loaderData.profiles
    const likes = loaderData.likes
    const profileLoggedIn = loaderData.profileLoggedIn
    const comments = loaderData.comments

    const [publicationsState, setPublicationsState] = React.useState(publications)
    const [likesState, setLikesState] = React.useState(likes)
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
    />

    return (
        <>
            {renderPublication}
        </>
    )
}