import { Container, ImageDiv, PostDiv, PostButton, PostForm, PostInput, PostsContainer, Title, NoPosts, LoadingParagraph } from "./Home/styled"
import axios from "axios"
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post/Post"
import { useContext, useEffect, useRef, useState } from "react";
import TrendingBar from "../components/TrendingBar";
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

Modal.setAppElement(document.getElementById('root'));

export default function HashtagPage({ posts, setPosts, hashtagName, setHashtagName }) {
    const [form, setForm] = useState({ url: "", description: "" });
    const [isLoading, setIsLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const token = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [postId, setPostId] = useState(undefined);
    const [userFromQuery, setUserFromQuery] = useState(null);
    const [hashtagPosts, setHashtagPosts] = useState([]);
    const location = useLocation();
    let subtitle;



    const config = {
        headers: {
            Authorization: `
            Bearer ${token}`
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '100px',
            borderRadius: '50px',
            backgroundColor: '#333333',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
            fontSize: '26px'
        },
    };

    

    useEffect(() => {
        
        
        const request = axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${encodeURIComponent(hashtagName)}`, config);

        request.then((response) => {
            setHashtagPosts(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [hashtagName]);

    function openModal(id) {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'white';
    }

    function closeModal(hasError) {
        if (hasError) return alert('Não foi possível excluir o post');
        setPostId(undefined);
        setIsOpen(false);
    }

    async function deletePost() {
        setLoaded(true);
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/timeline/${postId}`, config);
        } catch (error) {
            closeModal(true);
        }
        setLoaded(false);
        closeModal();
    };

    return (
        <Container>
            <Header user={user}></Header>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={() => closeModal(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Are you sure you want
                    to delete this post?</h2>
                <h2>{loaded && 'Deleting post...'}</h2>
                <br></br>
                <br></br>
                <br></br>
                <div>
                    <NoDeleteStyled onClick={() => closeModal(false)} >No, go back</NoDeleteStyled>
                    <DeleteStyled onClick={() => deletePost()}>Yes, delete it</DeleteStyled>
                </div>
            </Modal>
            <LeftColumn>
                <PostsContainer>
                    <Title>{hashtagName}</Title>
                </PostsContainer>
                <PostsContainer>
                    {hashtagPosts.length ? hashtagPosts.map((post) => (
                        location.pathname?.includes('user') && location.pathname.substring(location?.pathname?.lastIndexOf("/") + 1) === String(post.user_id) ?
                            <Post
                                key={post.post_id}
                                user={user}
                                token={token}
                                loaded={loaded}
                                setLoaded={setLoaded}
                                config={config}
                                post={post}
                                postId={post.post_id}
                                posts={posts}
                                setPosts={setPosts}
                                deletePost={() => {
                                    setPostId(post.post_id);
                                    openModal(post.post_id);
                                }}
                                setHashtagName={setHashtagName}
                            >

                            </Post> :
                            <Post
                                key={post.post_id}
                                user={user}
                                token={token}
                                loaded={loaded}
                                setLoaded={setLoaded}
                                config={config}
                                post={post}
                                postId={post.post_id}
                                posts={posts}
                                setPosts={setPosts}
                                deletePost={() => {
                                    setPostId(post.post_id);
                                    openModal(post.post_id);
                                }}
                                setHashtagName={setHashtagName}
                            >

                            </Post>
                    ))
                        : loaded ? <NoPosts>There are no posts yet</NoPosts> : <LoadingParagraph>Loading...</LoadingParagraph>}
                </PostsContainer>
            </LeftColumn>
            <TrendingBar
                setHashtagName={setHashtagName} setPosts={setPosts} posts={posts}
            ></TrendingBar>
        </Container>
    )
}

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const DeleteStyled = styled.button`
  background-color: #1877F2;
  color: white;
  border: none;
  font-size: 26px;
  padding: 12px;
`;

const NoDeleteStyled = styled.button`
  margin-right: 15px;
  font-size: 26px;
  background-color: white;
  color: #1877F2;
  border: none;
  padding: 12px;

`;