import { Container, ImageDiv, PostDiv, PostButton, PostForm, PostInput, PostsContainer, Title } from "./styled"
import axios from "axios"
import styled from "styled-components";
import Header from "../../components/Header";
import Post from "../../components/Post/Post"
import { useState } from "react";
import TrendingBar from "../../components/TrendingBar";


 export default function Home() {
    const [form, setForm] = useState({ url: "", description: "" })
    const [isLoading, setIsLoading] = useState(false)
    const jwt = useState({token: "meuToken"})
    
    //Apenas para testar rederização
    const mockPosts = [
        {id: 1, userName: "Juvenal Juvêncio", userId: 1, userImage: "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image04_grd.png",
    link: "https://medium.com/@pshrmn/a-simple-react-router", description: "Muito maneiro esse tutorial de Material UI com React, deem uma olhada!",
    totalLikes: 24},
    {id: 2, userName: "Juvenal Juvêncio", userId: 1, userImage: "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image04_grd.png",
    link: "https://medium.com/@pshrmn/a-simple-react-router", description: "Muito maneiro esse tutorial de Material UI com React, deem uma olhada!",
    totalLikes: 28}
    ]
    const [posts, setPosts] = useState(mockPosts)



    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handlePost(e) {
        e.preventDefault();
        setIsLoading(true);
        const body = {...form}
        try {
            //await axios.post(`${process.env.REACT_APP_API_URL}/timeline`, body, jwt);
            alert("funfou")
            setIsLoading(false)
    
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            alert("There was an error publishing your link")
        }
    }


    return (
        <Container>
            <Header></Header>
           <LeftColumn> 
            <PostsContainer>
            <Title>Timeline</Title>
                <PostDiv>
                    <ImageDiv>
                        <img src="http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image04_grd.png" alt="profile picture">
                        </img>
                    </ImageDiv>
                    <PostForm onSubmit={handlePost}>
                        <p>What are you going to share today?</p>
                            <PostInput 
                                 name="url"
                                 placeholder="http://..."
                                 type="text"
                                 required
                                 height={"30px"}
                                 disabled={isLoading}
                                 value={form.url}
                                 onChange={handleForm}
                            />
                            <PostInput 
                                 name="description"
                                 placeholder="Awesome article about #javascript"
                                 type="text"
                                 height={"60px"}
                                 disabled={isLoading}
                                 value={form.description}
                                 onChange={handleForm}
                            />
                            <PostButton type="submit" disabled={isLoading}>
                                {isLoading ? "Publishing..." : "Publish"}
                            </PostButton>
                    </PostForm>
                </PostDiv>
            </PostsContainer>
            <PostsContainer>
                {posts.length? posts.map((post) => <Post post={post}></Post>) : <p>There are no posts yet</p>}
            </PostsContainer>
            </LeftColumn>
            <TrendingBar/>
        </Container>
    )
}

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
`