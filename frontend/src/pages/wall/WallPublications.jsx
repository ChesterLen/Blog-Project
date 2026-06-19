import React from "react"
import { getPublications } from "../../utils"
import { useLoaderData } from "react-router-dom"
import Publication from "../../components/Publication"

export async function loader() {
    const data = await getPublications()
    return data
}

export default function WallPublicationDetail() {
    const loaderData = useLoaderData()
    const [publications, setPublications] = React.useState(loaderData.reverse())

    React.useEffect(() => {
        setPublications(loaderData.reverse())
    }, [loaderData])

    const renderPublications = publications.map(
        publication => <Publication
            key={publication.id}
            id={publication.id}
            title={publication.title}
            text={publication.text}
            profile={publication.profile}
        />
    )
    
    return renderPublications
}