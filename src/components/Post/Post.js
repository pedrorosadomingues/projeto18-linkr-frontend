import { ImageDiv, InfoDescription, InfoDiv, Likes, MetadataDiv, PostDiv, UserName } from "./styled"
import { AiOutlineHeart } from "react-icons/ai";


export default function Post({post}){
    return(
        <PostDiv>
            <ImageDiv>
                <img src={post.userImage}  alt="Profile Picture"/>
                <AiOutlineHeart size={25} style={{color: '#ffffff', marginBottom: '10px'}}/>
    
                <Likes>{post.totalLikes} likes</Likes>
            </ImageDiv>
            <InfoDiv>
                    <UserName>{post.userName}</UserName>
                    <InfoDescription>{post.description}</InfoDescription>
                    <MetadataDiv>
                        metaData
                    </MetadataDiv>
            </InfoDiv>
        </PostDiv>
    );
}