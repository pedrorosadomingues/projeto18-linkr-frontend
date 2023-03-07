import styled from "styled-components"

export const PostDiv = styled.div`
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  width: 100%;
  padding: 20px 23px;
  display:flex;
  font-family: 'Lato';
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
    width: 100%;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
`