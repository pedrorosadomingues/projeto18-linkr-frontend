import { EditStyled, ImageDiv, InfoDescription, InfoDiv, Likes, MetadataDiv, MetaImg, MetaInfo, PostDiv, TrashStyled, UserName } from "./styled"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LikeFilled, LikeOutline } from "../../pages/Home/styled";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip'


export default function Post({ post, deletePost, postId, loaded, setLoaded, config, user, token, posts, setPosts, setHashtagName }) {
  const postRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [liked, setLiked] = useState(false)
  const [element, setElement] = useState("")
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
    const found = post.liked_by_users.find((obj) => obj.user_id === user.id)
    if (found) setLiked(true)
    const tooltip = tooltipElement(post.liked_by_users, post.like_count, liked, user.id)
    setElement(tooltip)
   

    if (!editing) {
      //postRef.current.innerText = post.post_description;
      postRef.current.contentEditable = false;
    } else {
      postRef.current.contentEditable = true;
      postRef.current.focus();
    }
  }, [editing, loaded]);

  function redirect(url) {
    window.open(url, '_blank');
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
    console.log('EDIT');
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
      <ImageDiv>
        <img src={post.user_image_url} alt="Profile" />
        {liked ? <LikeFilled onClick={() => unlikePost(post.post_id)} data-test="like-btn"/> : <LikeOutline data-test="like-btn" onClick={() => likePost(post.post_id)} />}


        <Likes data-tooltip-id="my-tooltip" data-tooltip-content={element} data-test="counter">
          {post.like_count} {post.like_count === 1 ? "like" : "likes"}</Likes>
        <Tooltip id="my-tooltip" data-test="tooltip"/>
      </ImageDiv>
      <InfoDiv>
        <UserName data-test="username" onClick={() => {
          navigate(`/user/${post.user_id}`)
          window.location.reload();
        }}>{post.user_name}</UserName>
        {/* <UserName>{post.user_name}</UserName> */}

          <InfoDescription disabled={loaded} ref={postRef} onKeyDown={handleKeyDown}>{newDescription.map((word, index) => {
          if (word[0] === '#') {
            return (
              <strong 
              onClick={() => filterPostsByHashtag(word)}
               >
                {word}{' '}
              </strong>
            );
          } else {
            return word + ' ';
          }
          })}
          </InfoDescription>

        <MetadataDiv onClick={() => redirect(post.metadata_info.url)}>
          <MetaInfo>
            <h2>{post.metadata_info.title}</h2>
            <h3>{post.metadata_info.description}</h3>
            <h4 data-test="link">{post.metadata_info.url}</h4>
          </MetaInfo>
          <MetaImg src={post.metadata_info.image} alt="metadata_image"></MetaImg>
        </MetadataDiv>
      </InfoDiv>
    </PostDiv>
  );
}
