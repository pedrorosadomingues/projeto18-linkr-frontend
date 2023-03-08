import { EditStyled, ImageDiv, InfoDescription, InfoDiv, Likes, MetadataDiv, MetaImg, MetaInfo, PostDiv, TrashStyled, UserName } from "./styled"
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


export default function Post({ post, deletePost, postId, loaded, setLoaded, config }) {
  const postRef = useRef(null);
  const [editing, setEditing] = useState(false);

  // console.log(config);

  useEffect(() => {
    // console.log('Editing??', editing)
    if (!editing) {
      postRef.current.innerText = post.post_description;
      postRef.current.contentEditable = false;
    } else {
      postRef.current.contentEditable = true;
      postRef.current.focus();
    }
  }, [editing]);

  function redirect(url) {
    window.open(url, '_blank');
  }

  async function editPost(text) {
    console.log('EDIT');
    console.log(config);
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
        onClick={deletePost}
      >
        <ion-icon name="trash"></ion-icon>
      </TrashStyled>
      <EditStyled
        onClick={() => setEditing(!editing)}
      >
        <ion-icon name="pencil"></ion-icon>
      </EditStyled>
      <ImageDiv>
        <img src={post.user_image_url} alt="Profile Picture" />
        <AiOutlineHeart size={25} style={{ color: '#ffffff', marginBottom: '10px' }} />

        <Likes>{post.like_count} likes</Likes>
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