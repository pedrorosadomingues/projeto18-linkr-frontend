import styled from "styled-components"

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  background-color: #333333;
  h1{
    font-family: 'Saira Stencil One';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  color: #FFFFFF;
  }
`

export const Title = styled.div`
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  margin-top: 148px;
  color: #FFFFFF;
  max-width: 611px;
  margin-bottom: 43px;
  width: 100%;
@media (max-width: 600px){
  margin-top: 90px;
}
`
export const PostsContainer = styled.div`
   max-width: 611px;
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`
export const PostDiv = styled.div`
  background: #FFFFFF;
  font-family: 'Lato';
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  width: 100%;
  padding: 20px 23px;
  display:flex;
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
  }
  @media (max-width: 600px){
    display:none;
  }
`

export const PostForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    p{
      font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 10px;
    color: #707070;
    width: 100%;
    @media (max-width: 600px){
      text-align: center;
    }
    }
`

export const PostInput = styled.input`
  width: 100%;
  height: ${props => props.height};
  background: #EFEFEF;
  border-radius: 5px;
  border: none;
  padding: 0px 13px;
  margin-bottom: 5px;
`

export const PostButton = styled.button`
  max-width: 112px;
  width: 100%;
  height: 31px;
  background: #1877F2;
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #FFFFFF;
  border: none;
`

export const LoadingParagraph = styled.p`
  width: 100%;
  font-size: 40px;
  color: #fff;
  line-height: 20px;
  text-align: center;
`

export const NoPosts = styled.p`
  width: 100%;
  font-size: 30px;
  color: #fff;
  line-height: 15px;
  text-align: center;
`