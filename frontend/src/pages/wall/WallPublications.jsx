import React from "react"
import { getPublications } from "../../utils"
import { useLoaderData } from "react-router-dom"
import Publication from "../../components/Publication"

export async function loader() {
    const data = await getPublications()

    const res = await fetch("http://localhost:8000/api/profiles/list")
    const data2 = await res.json()
    return {publications: data, profiles: data2}
}

export default function WallPublicationDetail() {
    const loaderData = useLoaderData()
    const [publications, setPublications] = React.useState(loaderData.publications.reverse())
    const profiles = loaderData.profiles

    React.useEffect(() => {
        setPublications(loaderData.publications.reverse())
    }, [loaderData])

    const renderPublications = publications.map(
        publication => <Publication
            key={publication.id}
            id={publication.id}
            profileImg={profiles.find(p => p.id == publication.profile).profile_image}
            firstName={profiles.find(p => p.id == publication.profile).first_name}
            imgSrc={publication.image}
            title={publication.title}
            text={publication.text}
            profile={publication.profile}
        />
    )
    
    return renderPublications
}