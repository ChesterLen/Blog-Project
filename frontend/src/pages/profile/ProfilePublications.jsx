import React from "react"
import { useLoaderData, useParams } from "react-router-dom"
import { getPublications } from "../../utils"
import Publication from "../../components/Publication"

export async function loader({ params }) {
    const data = await getPublications()

    const profileId = params.id
    const res = await fetch(`http://localhost:8000/api/profile/${profileId}`)
    const data2 = await res.json()
    return {publications: data, profile: data2}
}

export default function ProfilePublications() {
    const loaderData = useLoaderData()
    const [publications, setPublications] = React.useState(loaderData.publications.reverse())
    const profile = loaderData.profile
    const profileId = useParams().id

    React.useEffect(() => {
        setPublications(prevPublications => loaderData.publications.reverse())
    }, [loaderData])

    const filteredPublications = publications.filter(p => p.profile == profileId)

    const renderPublications = filteredPublications.map(
        publication => <Publication
            key={publication.id}
            id={publication.id}
            profileImg={profile.profile_image}
            imgSrc={publication.image}
            title={publication.title}
            text={publication.text}
        />
    )

    return (
        <div className="publications">
            {publications && renderPublications}
        </div>
    )
}