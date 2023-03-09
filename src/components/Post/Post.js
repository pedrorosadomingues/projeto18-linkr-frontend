import { EditStyled, ImageDiv, InfoDescription, InfoDiv, Likes, MetadataDiv, MetaImg, MetaInfo, PostDiv, TrashStyled, UserName } from "./styled"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LikeFilled, LikeOutline } from "../../pages/Home/styled";




export default function Post({ post, deletePost, postId, loaded, setLoaded, config, user, token }) {
  const postRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [liked, setLiked] = useState(false)
  let newDescription

  console.log('Post:', post.user_id);
  console.log('User: ', user.id);

  useEffect(() => {
    // console.log('Editing??', editing)
    const found = post.liked_by_users.find((obj) => obj.user_id === user.id)
    if (found) setLiked(true)

    let getHashtags = post.post_description.match(/#[a-zA-Z0-9]+/g);

    newDescription =  post.post_description
  
    getHashtags?.forEach( async (h) => {
    
     newDescription = newDescription.replace(h, `<a href="/hashtag/${h.replace('#', '')}">${h}</a>`)
    })

    if (!editing) {
      postRef.current.innerHTML = newDescription;
      postRef.current.contentEditable = false;
    } else {
      postRef.current.contentEditable = true;
      postRef.current.focus();
    }
  }, [editing]);

  function redirect(url) {
    window.open(url, '_blank');
  }

  async function likePost(postId){
    
    try {
      await  axios.post(`${process.env.REACT_APP_API_URL}/like`, {postId}, config);
      setLiked(true)
      setLoaded(false);
    } catch (error) {
      console.log(error)
    }
  }

  async function unlikePost(postId){
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
      await axios.put(`${process.env.REACT_APP_API_URL}/timeline/${postId}`, {text}, config);
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
    <PostDiv>
      <TrashStyled
        display={user.id === post.user_id}
        onClick={deletePost}
      >
        <ion-icon name="trash"></ion-icon>
      </TrashStyled>
      <EditStyled
        display={user.id === post.user_id}
        onClick={() => setEditing(!editing)}
      >
        <ion-icon name="pencil"></ion-icon>
      </EditStyled>
      <ImageDiv>
        <img src={post.user_image_url} alt="Profile" />
        {liked ? <LikeFilled onClick={()=>unlikePost(post.post_id)}/> : <LikeOutline onClick={()=>likePost(post.post_id)} />}
        

        <Likes>{post.like_count} {post.like_count === 1? "like":"likes"}</Likes>
      </ImageDiv>
      <InfoDiv>
        <UserName>{post.user_name}</UserName>
        <InfoDescription disabled={loaded} ref={postRef} onKeyDown={handleKeyDown}>{post.post_description}</InfoDescription>
        <MetadataDiv onClick={() => redirect(post.metadata_info.url)}>
          <MetaInfo>
            <h2>{post.metadata_info.title}</h2>
            <h3>{post.metadata_info.description}</h3>
            <h4>{post.metadata_info.url}</h4>
          </MetaInfo>
          <MetaImg src={post.metadata_info.image} alt="metadata_image"></MetaImg>
        </MetadataDiv>
      </InfoDiv>
    </PostDiv>
  );
}