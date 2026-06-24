import React from "react"
import { useLoaderData } from "react-router-dom"
import { 
    getPublications, 
    getProfiles, 
    getLikes, 
    getCookie, 
    getProfile, 
    getLoggedInProfile 
} from "../../utils"

export async function loader() {
    const publications = await getPublications()
    const profiles = await getProfiles()
    const likes = await getLikes()
    const profileLoggedIn = await getLoggedInProfile()
    return { 
        publications: publications, 
        profiles: profiles, 
        likes: likes, 
        profileLoggedIn: profileLoggedIn }
}

export default function Publications() {
    const loaderData = useLoaderData()

    const [publications, setPublications] = React.useState(loaderData.publications)
    const [profiles, setProfiles] = React.useState(loaderData.profiles)
    const [likes, setLikes] = React.useState(loaderData.likes)
    const [message, setMessage] = React.useState("")

    const profileLoggedIn = loaderData.profileLoggedIn.profile_logged_in

    console.log(likes.find(l => l.profile == profileLoggedIn))
    
    async function like(publicationId) {
        const publication = publications.find(p => p.id === publicationId)
        const res = await fetch(`http://localhost:8000/api/publication/like/${publicationId}/`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie()
            },
            body: JSON.stringify({ publicationId: publicationId, profileId: profileLoggedIn })
        })

        const data = await res.json()
        return { data: data, publication: publication }
    }

    const renderPublications = publications.map(publication => <div key={publication.id} className="publication">
        <div className="profile">
            <div className="profile-content">
                {profiles.find(p => p.id == publication.profile).profile_image && <div className="prf-img">
                    <img src={profiles.find(p => p.id == publication.profile).profile_image} alt="profile image" />
                </div>}
                <p>{profiles.find(p => p.id == publication.profile).first_name}</p>
            </div>
        </div>

        <div className="pub-content">
            <h2>{publication.title}</h2>
            <p>{publication.text}</p>
        </div>

        <div className="pub-img">
            <img src={publication.image} alt="publication image" />
        </div>

        <div className="engagement">
            <button onClick={async () => {
                const likeF = await like(publication.id)
                const publicationF = likeF.publication
                const message = likeF.data.message || ""

                setMessage(message)

                if (!likeF.data.message) {
                    setLikes(await getLikes())

                    setPublications(prevPublications =>
                        prevPublications.map(publication =>
                            publication.id === publicationF.id && !likes.find(l => l.profile == profileLoggedIn)
                                ? {
                                    ...publication,
                                    likes: publication.likes + 1
                                }
                                : {
                                    ...publication,
                                    likes: publication.likes - 1
                                }
                        )
                    )
                }
            }}>Like</button>
            <p>Likes: {publication.likes}</p>
            <p>Comments: 0</p>
            {message && <p>{message}</p>}
        </div>
    </div>
    )

    return (
        <div className="wall-publications-container">
            <h1>Publications</h1>
            <div className="outer-container">
                <div className="inner-container">
                    { profiles && renderPublications }
                </div>
            </div>
        </div>
    )
}