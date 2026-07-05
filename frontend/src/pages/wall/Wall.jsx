import React from "react"
import Publication from "../../components/publication/Publication"
import { useLoaderData } from "react-router"
import { getPublications, getProfiles } from "../../utils"
import defaultProfileImage from "../../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"

export async function loader() {
    const publications = await getPublications()
    const profiles = await getProfiles()
    return { publications: publications, profiles: profiles }
}

export  default function Publications() {
    const { publications, profiles } = useLoaderData()

    const [publicationsState, setPublicationsState] = React.useState(publications)

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
            />
        )
    }
    )

    return (
        <div className="wall-publications-container">
            <div className="outer-container">
                <h1>Publications</h1>
                <div className="inner-container">
                    { renderPublications }
                </div>
            </div>
        </div>
    )
}