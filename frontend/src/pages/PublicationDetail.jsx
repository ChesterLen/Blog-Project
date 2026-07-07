import React from "react"
import Publication from "../components/publication/Publication"
import Engagement from "../components/publication/Engagement"
import Comment from "../components/publication/Comment"
import { getPublication, getProfiles, getLoggedInProfile, getCookie, getComments, getReplies } from "../utils";
import { useLoaderData, useActionData } from "react-router";
import defaultProfileImage from "../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png"

export async function action({ request }) {
  const formData = await request.formData()
  const comment = formData.get("comment")
  const publication = formData.get("id")
  const parent = formData.get("parent")

  const profileLoggedIn = await getLoggedInProfile()
  const author = profileLoggedIn.profile_logged_in

  const res = await fetch("http://localhost:8000/api/comment/create/", {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie()
    },
    body: JSON.stringify({ comment, publication, author, parent })
  })

  const data = await res.json()
  console.log(data)
  
  return null
}

export async function loader({ params }) {
  return {
    publication: await getPublication(params.id),
    profiles: await getProfiles(),
    profileLoggedIn: await getLoggedInProfile(),
    comments: await getComments(),
    replies: await getReplies(),
  };
}

export default function PublicationDetail() {
  const { publication, profiles, profileLoggedIn, comments, replies } = useLoaderData()
  const isLoggedIn = profileLoggedIn.profile_logged_in || null

  const [commentsState, setCommentsState] = React.useState(comments)
  const [repliesState, setRepliesState] = React.useState(replies)

  React.useEffect(() => {
    setCommentsState(comments)
    setRepliesState(replies)
  }, [comments, replies])

  const renderComments = commentsState.filter(comment => comment.publication === publication.id).map(comment => {
    const profile = profiles.find(profile => profile.id === comment.author)
    return (
      <Comment
        key={comment.id}
        id={publication.id}
        comment={comment}
        profile = {profile}
        profiles={profiles}
        replies={repliesState}
      />
    )
  })

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
          isLoggedIn={isLoggedIn}
          comments={renderComments}
          id={publication.id}
        />
      }
    />
  )
}