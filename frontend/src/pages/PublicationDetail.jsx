import React from "react";
import Publication from "../components/Publication";
import {
  getPublications,
  getPublication,
  getProfiles,
  getLikes,
  getCookie,
  getLoggedInProfile,
  getComments,
  getCommentLikes,
} from "../utils";
import { useLoaderData, Form } from "react-router-dom";
import defaultProfileImage from "../assets/ChatGPT Image Jun 21, 2026, 02_52_22 PM.png";

export async function loader({ params }) {
  return {
    publication: await getPublication(params.id),
    publications: await getPublications(),
    profiles: await getProfiles(),
    likes: await getLikes(),
    profileLoggedIn: await getLoggedInProfile(),
    comments: await getComments(),
    commentLikes: await getCommentLikes(),
  };
}

export default function PublicationDetail() {
  const {
    publication,
    publications,
    profiles,
    likes,
    profileLoggedIn,
    comments,
    commentLikes,
  } = useLoaderData();

  const [publicationsState, setPublicationsState] = React.useState(publications);
  const [likesState, setLikesState] = React.useState(likes);
  const [commentsState, setCommentsState] = React.useState(comments);
  const [commentLikesState, setCommentLikesState] = React.useState(commentLikes);
  const [message, setMessage] = React.useState({});
  const [replyFormOnOff, setReplyFormOnOff] = React.useState({})
  const [cmtEditFormOnOff, setCmtEditFormOnOff] = React.useState({})
  const [cmtEditMenuOnOff, setCmtEditMenuOnOff] = React.useState({})

  React.useEffect(() => {
    if (profileLoggedIn.message) setMessage(profileLoggedIn);
  }, [profileLoggedIn]);

  const publicationComments = commentsState.filter(
    c => c.publication === publication.id
  );

  async function like(id) {
    const res = await fetch(`http://localhost:8000/api/publication/like/${id}/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie(),
      },
      body: JSON.stringify({
        publicationId: id,
        profileId: profileLoggedIn.profile_logged_in,
      }),
    });

    const data = await res.json();

    if (profileLoggedIn.message) {
      setMessage(data);
      return;
    }

    setLikesState(await getLikes());

    setPublicationsState(prev =>
      prev.map(pub => (pub.id === id ? { ...pub, likes: data.likes } : pub))
    );
  }

  async function commentLike(id) {
    const res = await fetch(`http://localhost:8000/api/comment/like/${id}/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": getCookie(),
      },
    });

    const data = await res.json();

    setCommentsState(prev =>
      prev.map(c => (c.id === id ? { ...c, likes: data.likes } : c))
    );

    setCommentLikesState(prev => {
      const liked = prev.some(
        l =>
          l.comment === id &&
          l.profile_liker === Number(profileLoggedIn.profile_logged_in)
      );

      if (liked) {
        return prev.filter(
          l =>
            !(
              l.comment === id &&
              l.profile_liker === Number(profileLoggedIn.profile_logged_in)
            )
        );
      }

      return [
        ...prev,
        {
          id: data.id,
          comment: data.comment,
          profile_liker: data.profile_liker,
        },
      ];
    });
  }

  const renderPublicationComments = publicationComments.map(comment => {
    const profile = profiles.find(
      p => p.id === comment.profile_commented
    );

    const likedByUser = commentLikesState.some(
      l =>
        l.comment === comment.id &&
        l.profile_liker === Number(profileLoggedIn.profile_logged_in)
    );

    const replyForm = <Form className="reply-form" method="post" id={comment.id}>
      <textarea type="text" name="reply" id="reply" required></textarea>
      <button>Reply</button>
      <div className="cancel-btn" onClick={() => setReplyFormOnOff(prev => ({...prev, [comment.id]: false}))}><i className="fa-solid fa-x" title="Cancel"></i></div>
    </Form>

    const commentMenu = <div className="cmt-menu">
      <div className="menu-btn">Edit</div>
      <div className="menu-btn">Delete</div>
    </div>

    const commentEditForm = <Form id={comment.id}>
      <input type="text" name="comment-edit" id="comment-edit" value={commentsState.find(c => c.id === comment.id).comment} />
      <button>Edit</button>
    </Form>

    return (
      <div className="comments-container" key={comment.id}>
        <div className="comment-and-edit">
          <div className="comment">
            <div className="comment-profile">
              <img src={profile?.profile_image || defaultProfileImage} className="prf-cmt-img" />
              <div className="cmt-prf-inr-cntr">
                <div className="cmt-names">
                  <p className="prf-cmt-fn">{profile?.first_name}</p>
                  <p className="prf-cmt-ln">{profile?.last_name}</p>
                </div>

                <div className="comment-cmt">
                  <p className="cmt-txt">{comment.comment}</p>
                </div>
              </div>
            </div>
            <div className="cmt-engagement">
              <button
                className="cmt-like-btn"
                onClick={() => commentLike(comment.id)}
              >
                {likedByUser ? (
                  <i className="fa-solid fa-thumbs-up"></i>
                ) : (
                  <i className="fa-regular fa-thumbs-up"></i>
                )}
              </button>

              <button className="cmt-rpl">
                <i className="fa-solid fa-reply" onClick={() => {
                  setReplyFormOnOff(prev => ({...prev, [comment.id]: true}))
                }} title="Reply"></i>
              </button>

              {comment.likes > 0 && (
                <p className="cmt-likes">
                  {comment.likes} <i className="fa-solid fa-thumbs-up"></i>
                </p>
              )}
            </div>
          </div>

          <div className="cmt-mng">
            <i className="fa-solid fa-ellipsis" onClick={() => setCmtEditMenuOnOff(prev => ({...prev, [comment.id]: true}))}></i>
            {cmtEditMenuOnOff[comment.id] && commentMenu}
          </div>
        </div>
      </div>
    );
  });

  const publicationProfile = profiles.find(
    p => p.id == publication.profile
  );

  return (
    <Publication
      key={publication.id}
      id={publication.id}
      profileImg={publicationProfile?.profile_image || defaultProfileImage}
      profileLoggedIn={profileLoggedIn}
      firstName={publicationProfile?.first_name}
      title={publication.title}
      text={publication.text}
      pubImg={publication.image}
      like={() => like(publication.id)}
      likes={publicationsState.find(p => p.id == publication.id)?.likes ?? 0}
      commentsCount={publicationComments.length}
      pLiked={likesState.some(
        l =>
          l.profile == profileLoggedIn.profile_logged_in &&
          l.publication == publication.id
      )}
      message={publication.id === message.publication_id ? message.message : null}
      comments={renderPublicationComments}
    />
  );
}