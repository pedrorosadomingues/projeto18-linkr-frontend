import { ImageDiv, InfoDescription, InfoDiv, Likes, MetadataDiv, MetaImg, MetaInfo, PostDiv, TrashStyled, UserName } from "./styled"
import { AiOutlineHeart } from "react-icons/ai";


export default function Post({ post, deletePost }) {

  function redirect(url) {
    window.open(url, '_blank');
  }

  return (
    <PostDiv>
      <TrashStyled
        onClick={deletePost}
      >
        <ion-icon name="trash"></ion-icon>
      </TrashStyled>
      <ImageDiv>
        <img src={post.user_image_url} alt="Profile Picture" />
        <AiOutlineHeart size={25} style={{ color: '#ffffff', marginBottom: '10px' }} />

        <Likes>{post.like_count} likes</Likes>
      </ImageDiv>
      <InfoDiv>
        <UserName>{post.user_name}</UserName>
        <InfoDescription>{post.post_description}</InfoDescription>
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