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

export async function action({ request }) {
  const formData = await request.formData()
  const commentEdit = formData.get("comment-edit")
  const commentId = formData.get("id")

  const comment = formData.get("comment")
  const publicationId = formData.get("publicationId")
  const profileLoggedIn = await getLoggedInProfile()

  if (publicationId && comment) {
    const res = await fetch("http://localhost:8000/api/comment/create/", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie(),
      },
      body: JSON.stringify({ publication: publicationId, comment: comment, profile_commented: profileLoggedIn.profile_logged_in })
    })
  }

  if (commentEdit && commentId) {
    const res = await fetch(`http://localhost:8000/api/comment/edit/${commentId}/`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie()
      },
      body: JSON.stringify({ commentId, commentEdit })
    })
  }
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

  React.useEffect(() => {
    setCommentsState(comments)
  }, [comments])
  
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
      <button className="menu-btn" onClick={() => setCmtEditFormOnOff(prev => ({...prev, [comment.id]: true}))}>Edit</button>
      <button className="menu-btn" onClick={() => {
        const res = fetch(`http://localhost:8000/api/comment/delete/${comment.id}/`, {
          method: "post",
          credentials: "include",
          headers: {
            "X-CSRFToken": getCookie(),
          },
        })
        setCommentsState(prev => prev.filter(com => com.id !== comment.id))
      }}>Delete</button>
    </div>

    const commentEditForm = <Form onSubmit={() => setCmtEditFormOnOff(prev => ({...prev, [comment.id]: false}))} method="post">
      <input type="text" name="comment-edit" id="comment-edit" defaultValue={comment.comment} onChange={(e) => setCommentsState(prev => prev.map(com => com.id === comment.id ? {...com, comment: e.target.value} : com))} />
      <input type="hidden" name="id" id="id" value={comment.id} />
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
                  {cmtEditFormOnOff[comment.id] ? commentEditForm : <p className="cmt-txt">{comment.comment}</p>}
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
            <i className="fa-solid fa-ellipsis" onClick={() => setCmtEditMenuOnOff(prev => ({...prev, [comment.id]: !prev[comment.id]}))}></i>
            {cmtEditMenuOnOff[comment.id] && commentMenu}
          </div>
        </div>
        {replyFormOnOff[comment.id] && replyForm}
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