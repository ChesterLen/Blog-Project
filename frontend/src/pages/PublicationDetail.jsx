import React from "react"
import Publication from "../components/publication/Publication"
import Engagement from "../components/publication/Engagement"
import CommentForm from "../components/publication/CommentForm"
import { getPublication, getProfiles, getLoggedInProfile } from "../utils";
import { useLoaderData, useActionData } from "react-router";
import defaultProfileImage from "../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"

export async function action({ request }) {
  const formData = await request.formData()
  const comment = formData.get("comment")
  const pubId = formData.get("id")
  const author = await getLoggedInProfile()
  
  if (author.message) {
    return { message: author.message }
  }
  
  return null
}

export async function loader({ params }) {
  return {
    publication: await getPublication(params.id),
    profiles: await getProfiles(),
  };
}

export default function PublicationDetail() {
  const { publication, profiles } = useLoaderData()
  const message = useActionData() || null
  console.log(message)

  const publicationProfile = profiles.find(
    p => p.id == publication.profile
  );

  return (
    <Publication
      key={publication.id}
      id={publication.id}
      profileImg={publicationProfile?.profile_image || defaultProfileImage}
      firstName={publicationProfile?.first_name}
      lastName={publicationProfile?.last_name}
      title={publication.title}
      text={publication.text}
      pubImg={publication.image}
      engagement={
        <Engagement
          id={publication.id}
        />
      }
    />
  )
}