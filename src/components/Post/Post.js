import { CommentDiv, CommentInfo, CommentsContainer, CommentsIcon, EditStyled, ImageDiv, InfoDescription, InfoDiv, Likes, MainDiv, MetadataDiv, MetaImg, MetaInfo, PostCommentDiv, PostCommentIcon, PostDiv, PostedBy, Shares, TrashStyled, UserName } from "./styled"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LikeFilled, LikeOutline } from "../../pages/Home/styled";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip'


export default function Post({ post, deletePost, sharePost, postId, loaded, setLoaded, config, user, token, posts, setPosts, setHashtagName }) {
  const postRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [commenting, setCommenting] = useState(false)
  const [liked, setLiked] = useState(false)
  const [element, setElement] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [commentForm, setCommentForm] = useState({comment: ""})
  const [ newDescription, setNewDescription ] = useState(post.post_description.split(" "))
  let navigate = useNavigate();

  function tooltipElement(liked_by, like_count, liked, userId) {

    if (liked_by.length === 0) return `No one liked this post yet`

    if (liked === true && liked_by[0].user_id !== userId) {
      return `${liked_by.length >= 2 ? `Você, ${liked_by[0].user_name} and ${like_count - 2} other people` :
        `Você liked this post`}`
    }
    if (liked === true && liked_by[0].user_id === userId) {
      return `${liked_by.length >= 2 ? `Você, ${liked_by[1].user_name} and ${like_count - 2} other people` :
        `Você liked this post`}`
    }
    if (liked === false) {
      return `${liked_by.length >= 2 ? `${liked_by[0].user_name}, ${liked_by[1].user_name} and ${like_count - 2} other people` :
        `${liked_by[0].user_name} liked this post`}`
    }
  }

  function filterPostsByHashtag(hashtag) {
    setHashtagName(hashtag);
    navigate('/hashtag/' + hashtag.replace('#', ''));
  }

  useEffect(() => {
    // console.log('Editing??', editing)
    // const found = post.liked_by_users.find((obj) => obj.user_id === user.id)
    // if (found) setLiked(true)
    const tooltip = tooltipElement(post.liked_by_users, post.liked_by_users.length, liked, user.id)
    setElement(tooltip)
   

    if (!editing) {
      postRef.current.innerText = post.post_description;
      postRef.current.contentEditable = false;
    } else {
      postRef.current.contentEditable = true;
      postRef.current.focus();
    }
  }, [editing, loaded, commenting]);


  function handleCommentForm(e) {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value })
  }

  async function makeComment(postId){
    const body = commentForm
    try {
      setCommenting(true)
      await axios.post(`${process.env.REACT_APP_API_URL}/comment/${postId}`, body, config);
      setCommenting(false)
      setLoaded(false)
      setCommentForm({comment: ""})
    } catch (error) {
      alert("Não foi possível publicar seu comentário")
      console.log(error)
    }
  }

  async function likePost(postId) {

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/like`, { postId }, config);
      setLiked(true)
      setLoaded(false);
    } catch (error) {
      console.log(error)
    }
  }

  async function unlikePost(postId) {
    const authorizationToken = `Bearer ${token}`
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/unlike`, {
        headers: {
          Authorization: authorizationToken
        },
        data: {
          postId
        }
      });
      setLiked(false)
      setLoaded(false);
    } catch (error) {
      console.log(error)
    }
  }

  async function editPost(text) {
    setLoaded(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/timeline/${postId}`, { text }, config);
      setEditing(false);
    } catch (error) {
      alert('Não foi possível alterar o post')
      throw new Error(error)
    }
    setLoaded(false);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Escape') {
      setEditing(false);
    }
    if (event.key === 'Enter') {
      await editPost(postRef.current.innerText);
    }
  }; 

  return (
    <PostDiv data-test="post">
      { post.shared_by_user_name &&
        <PostedBy>Re-posted by
          <strong>
            {post.shared_by_user_name === user.name ? ' you' : post.shared_by_user_name}
          </strong>
        </PostedBy>}
      <TrashStyled
        display={(user.id === post.user_id).toString()}
        onClick={deletePost}
        data-test="delete-btn"
      >
        <ion-icon name="trash"></ion-icon>
      </TrashStyled>
      <EditStyled
        display={(user.id === post.user_id).toString()}
        onClick={() => setEditing(!editing)}
        data-test="edit-btn"
      >
        <ion-icon name="pencil"></ion-icon>
      </EditStyled>
      
      <MainDiv>
      <ImageDiv>
        <img src={post.user_image_url} alt="Profile" />
        {post.liked_by_users.find((obj) => obj.user_id === user.id) ? <LikeFilled onClick={() => unlikePost(post.post_id)} data-test="like-btn"/> : <LikeOutline data-test="like-btn" onClick={() => likePost(post.post_id)} />}


        <Likes data-tooltip-id="my-tooltip" data-tooltip-content={element} data-test="counter">
          {post.liked_by_users.length} {post.liked_by_users.length === 1 ? "like" : "likes"}</Likes>
        <Tooltip id="my-tooltip" data-test="tooltip"/>

        <CommentsIcon data-test="comment-btn" onClick={()=> setShowComments(!showComments)}></CommentsIcon>
        <Likes data-test="comment-counter">{post.commented_by_users.length} {post.commented_by_users.length === 1 ? "comment" : "comments"}</Likes>

        <Shares data-test="repost-btn" onClick={sharePost}></Shares>
        <Likes data-test="repost-counter">{post.shares_count} {post.shares_count === 1 ? "re-post" : "re-posts"}</Likes>
      </ImageDiv>
      <InfoDiv>
        <UserName data-test="username" onClick={() => {
          navigate(`/user/${post.user_id}`)
          window.location.reload();
        }}>{post.user_name}</UserName>
        {/* <UserName>{post.user_name}</UserName> */}

          <InfoDescription ><p disabled={loaded} ref={postRef} onKeyDown={handleKeyDown} data-test="description">{newDescription.map((word, index) => {
          if (word[0] == '#') {
            
            return (
              <strong 
              onClick={() => filterPostsByHashtag(word)}
               >
                {word + ' '}
              </strong>
            );
          } else {
            return word + ' ';
          }
          })}
          </p>
          </InfoDescription>

        <MetadataDiv data-test="link" href={post.metadata_info.url} target="blank">
          <MetaInfo>
            <h2>{post.metadata_info.title}</h2>
            <h3>{post.metadata_info.description}</h3>
            <h4 >{post.metadata_info.url}</h4>
          </MetaInfo>
          <MetaImg src={post.metadata_info.image} alt="metadata_image"></MetaImg>
        </MetadataDiv>
      </InfoDiv>
      </MainDiv>
      <CommentsContainer data-test="comment-box" show={showComments}>
        {post.commented_by_users.length && 
        [...post.commented_by_users].reverse().map((comment, ind)=> 
        <CommentDiv data-test="comment" key={ind}>
          <img src={comment.commenter_image} alt="commenter_image"></img>
          <CommentInfo>
            <div>
              <strong>{comment.commenter_name}</strong>
              {comment.commenter_id === post.user_id ? 
              <span> • post's author</span> 
              : user && user.following_ids.includes(comment.commenter_id) ?
              <span> • following</span> : ""
            }
            </div>
            <p>{comment.comment}</p>
          </CommentInfo>
        </CommentDiv>)}
        <PostCommentDiv>
          <img src={user.imageUrl} alt="pfp"></img>
          <div>
            <input
               data-test="comment-input"
               name="comment"
               placeholder="write a comment..."
               type="text"
               required
               disabled={commenting}
               value={commentForm.comment}
               onChange={handleCommentForm}
            />
              <PostCommentIcon data-test="comment-submit" onClick={()=> makeComment(postId)}></PostCommentIcon>
          </div>
        </PostCommentDiv>
     </CommentsContainer>
    </PostDiv>
    
  );
}
