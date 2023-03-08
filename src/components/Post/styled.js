import styled from "styled-components"

export const PostDiv = styled.div`
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  width: 100%;
  padding: 20px 23px;
  display:flex;
  font-family: 'Lato';
  position: relative;
  @media (max-width: 600px){
    border-radius: 0px;
}
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
    color: #B7B7B7;
    margin-bottom: 8px;
`

export const UserName = styled.p`
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    margin-bottom: 7px;
`

export const MetadataDiv = styled.div`
    min-height: 155px;
    max-width: 503px;
    width: 100%;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display:flex;
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
  color: white;
  background-color: transparent;
  border: none;
  font-size: 20px;
`;

export const EditStyled = styled.button`
  position: absolute;
  right: 55px;
  color: white;
  background-color: transparent;
  border: none;
  font-size: 20px;
`;