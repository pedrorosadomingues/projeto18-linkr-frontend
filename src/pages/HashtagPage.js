import { Container, ImageDiv, PostDiv, PostButton, PostForm, PostInput, PostsContainer, Title, NoPosts, LoadingParagraph } from "./styled"
import axios from "axios"
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post/Post"
import { useContext, useEffect, useState } from "react";
import TrendingBar from "../components/TrendingBar";
import { AuthContext } from "../contexts/AuthContext";

 export default function Home() {
    const [form, setForm] = useState({ url: "", description: "" });
    const [isLoading, setIsLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [posts, setPosts] = useState([]);
    const {token} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const config = {
        headers: {
            Authorization: `
            Bearer ${token}`
        }
    }

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(()=> {
        axios.get(`${process.env.REACT_APP_API_URL}/get-user`, config)
        .then((res) =>{
            console.log(res.data)
            setUser(res.data)
           
        })
        .catch((err) =>{
            console.log(err)
            alert("You are not logged!");
        })

        const promise = axios.get(`${process.env.REACT_APP_API_URL}/timeline`, config)
        promise.then((res) =>{
            console.log(res.data)
            setPosts(res.data)
            setLoaded(true)
        })
        .catch((err) =>{
            console.log(err)
            alert("An error occured while trying to fetch the posts, please refresh the page");
        })
    }, [loaded])

    async function handlePost(e) {
        e.preventDefault();
        setIsLoading(true);
        const body = {...form}
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/timeline`, body, config);
            console.log("funcionou");
            setIsLoading(false);
            setForm({ url: "", description: "" });
            setLoaded(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            alert("There was an error publishing your link")
        }
    }
    
    return (
        <Container>
            <Header user={user}></Header>
            <LeftColumn>
            <PostsContainer>
            <Title>Timeline</Title>
                <PostDiv>
                    <ImageDiv>
                        <img src={user.imageUrl} alt="profile picture">
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
                {posts.length? posts.map((post) => <Post key={post.post_id} post={post}></Post>) 
                : loaded ? <NoPosts>There are no posts yet</NoPosts> : <LoadingParagraph>Loading...</LoadingParagraph>}
            </PostsContainer>
            </LeftColumn>
            <TrendingBar></TrendingBar>
        
        </Container>
    )
}

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
`
