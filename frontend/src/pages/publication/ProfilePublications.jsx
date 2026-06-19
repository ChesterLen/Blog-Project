import React from "react"
import { useLoaderData } from "react-router-dom"
import { getPublications } from "../../utils"
import Publication from "../../components/Publication"

export async function loader() {
    const data = await getPublications()
    return data
}

export default function ProfilePublications() {
    const loaderData = useLoaderData()
    const [publications, setPublications] = React.useState(loaderData.reverse())

    React.useEffect(() => {
        setPublications(prevPublications => loaderData.reverse())
    }, [loaderData])

    const renderPublications = publications.map(publication => <Publication key={publication.id} id={publication.id} title={publication.title} text={publication.text} />)
    return (
        <div className="publications">
            {publications && renderPublications}
        </div>
    )
}