import styled from "styled-components"
import { AiOutlineComment } from "react-icons/ai";
import {IoPaperPlaneOutline} from "react-icons/io5";
import { BiRepost } from "react-icons/bi";

export const PostDiv = styled.div`
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Lato';
  position: relative;
  
  @media (max-width: 600px){
    border-radius: 0px;
}
`

export const MainDiv = styled.div`
    display:flex;
    padding: 20px 23px;
`

export const ImageDiv = styled.div`
  margin-right: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  img{
    width:50px;
    height:50px;
    border-radius: 50%;
    margin-bottom: 15px;
    object-fit: cover;
  }

`

export const Likes = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    color: #FFFFFF;
`

export const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
`
export const InfoDescription = styled.div`
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin-bottom: 8px;
    strong{
      color: #b7b7b7;
      font-weight: 900;
      cursor: pointer;
    }
`

export const UserName = styled.p`
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    margin-bottom: 7px;
`

export const MetadataDiv = styled.a`
    min-height: 155px;
    max-width: 503px;
    width: 100%;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display:flex;
    text-decoration: none;
`

export const MetaImg = styled.img`
  border-radius: 0px 12px 13px 0px;
  max-width: 150px;
  width:100%;
  max-height: 100%;
  object-fit: contain;
`

export const MetaInfo = styled.div`
  max-width: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 19px;
  font-family: 'Lato';
  h2{
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #CECECE;
  margin-bottom: 5px;
  }
  h3{
    font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #9B9595;
  margin-bottom: 10px;
  }
  h4{
    font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #CECECE;
  }
`
export const TrashStyled = styled.button`
  position: absolute;
  right: 15px;
  top:20px;
  color: white;
  background-color: transparent;
  border: none;
  font-size: 20px;
  display: ${({display}) => display === 'true' ? 'block' : 'none'};
`;

export const EditStyled = styled.button`
  position: absolute;
  right: 55px;
  top:20px;
  color: white;
  background-color: transparent;
  border: none;
  font-size: 20px;
  display: ${({display}) => display === 'true' ? 'block' : 'none'};
`;

export const CommentsIcon = styled(AiOutlineComment)`
  color: #ffffff;
  margin-top: 10px;
  width:25px;
  height: 25px;
  & :hover{
    cursor: pointer;
  }
`;

export const CommentsContainer = styled.div`
  width:100%;
  display: ${props => props.show ? "flex": "none"};
  flex-direction: column;
  background: #1E1E1E;
  border-radius: 16px;
  padding: 16px 20px;
`
export const CommentDiv = styled.div`
  width:100%;
  display: flex;
  column-gap: 18px;
  margin-bottom:16px;
  border-bottom: 1px solid #353535;
  transform: rotate(-0.1deg);
  & img{
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }
`

export const CommentInfo = styled.div`
  width: 100%;
  display:flex;
  flex-direction: column;
  row-gap: 5px;
  font-family: 'Lato';
  font-size: 14px;
  line-height: 17px;
  & strong{
    font-weight: 700;
    color: #ffffff
  }
  & span {
    color: #565656;
  }
  & p{
    color: #ACACAC;
    margin-bottom: 16px;
  }
`

export const PostCommentDiv = styled.div`
  width:100%;
  margin-top: 4px;
  display: flex;
  column-gap: 14px;
  & img{
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }
  & div {
    background: #252525;
    width:100%;
    border-radius: 8px;
    display:flex;
    align-items: center;
    padding: 0px 12px;
  }
  & input {
    background: #252525;
    border: none;
    width: 100%;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #ffffff;
    & ::placeholder{
      font-style: italic;
      color: #575757;
    }
    &:focus{
      outline: none;
    }
  }
`

export const PostCommentIcon = styled(IoPaperPlaneOutline)`
  width: 18px;
  height: 18px;
  color: #ffffff;
  & :hover{
    cursor: pointer;
  }
`

export const PostedBy = styled.h2`
  background-color: #1e1e1e;
  padding: 10px;
  color: white;
`;

export const Shares = styled(BiRepost)`
  font-size: 25px;
  color: #ffffff;
  & :hover{
    cursor: pointer;
  }
`;