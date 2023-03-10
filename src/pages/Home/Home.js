import { Container, ImageDiv, PostDiv, PostButton, PostForm, PostInput, PostsContainer, Title, NoPosts, LoadingParagraph } from "./styled"
import axios from "axios"
import styled from "styled-components";
import Header from "../../components/Header";
import Post from "../../components/Post/Post"
import { useContext, useEffect, useRef, useState } from "react";
import TrendingBar from "../../components/TrendingBar";
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";

Modal.setAppElement(document.getElementById('root'));

export default function Home({ posts, setPosts, setHashtagName }) {
  const [form, setForm] = useState({ url: "", description: "" });
  const [isLoading, setIsLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const token = JSON.parse(localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState(undefined);
  const [userFromQuery, setUserFromQuery] = useState(null);
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

  async function getUserById(id) {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token && token !== '') {
      try {
        const config = {
          headers: {
            authentication: `Bearer ${token}`,
          }
        };
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/get-user-by-id`, { id }, config);
        console.log('Data from id', data)
        setUserFromQuery(data[0]);

      } catch (error) {
        console.log(error);

        throw new Error(error);
      }
    }
  };

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const { pathname } = location;

    if (pathname.includes('user')) {
      const index = pathname.lastIndexOf("/");
      const result = pathname.substring(index + 1);

      getUserById(Number(result));
    }

    axios.get(`${process.env.REACT_APP_API_URL}/get-user`, config)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err)
        alert("You are not logged!");
      })

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/timeline`, config)
    promise.then((res) => {
      // console.log(res.data)
      setPosts(res.data)
      setLoaded(true)
    })
      .catch((err) => {
        console.log(err)
        alert("An error occured while trying to fetch the posts, please refresh the page");
      })
  }, [loaded])

  async function handlePost(e) {
    e.preventDefault();
    setIsLoading(true);
    const body = { ...form }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/timeline`, body, config);
      setIsLoading(false);
      setForm({ url: "", description: "" });
      setLoaded(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("There was an error publishing your link")
    }
  }

  function openModal(id) {
    setIsOpen(true);
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/get-user`, config)
      .then((res) => {
        // console.log(res.data)
        setUser(res.data)

      })
      .catch((err) => {
        console.log(err)
        alert("You are not logged!");
      })

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/timeline`, config)
    promise.then((res) => {
      console.log(res.data)
      setPosts(res.data)
      setLoaded(true)
    })
      .catch((err) => {
        console.log(err)
        alert("An error occured while trying to fetch the posts, please refresh the page");
      })
  }, [loaded])

  async function handlePost(e) {
    e.preventDefault();
    let getHashtags = form.description.split(' ').filter((word) => word.startsWith('#'))
    // console.log('getHashtags:', getHashtags)

    setIsLoading(true);
    const body = { ...form }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/timeline`, body, config);
      console.log("funcionou");
      if (getHashtags?.length > 0) {
        getHashtags.forEach(async (h) => {
          await axios.post(`${process.env.REACT_APP_API_URL}/hashtag`, { h }, config)
        })
      }
      setIsLoading(false);
      setForm({ url: "", description: "" });
      setLoaded(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("There was an error publishing your link")
    }
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
          <NoDeleteStyled onClick={() => closeModal(false)} data-test="cancel">No, go back</NoDeleteStyled>
          <DeleteStyled onClick={() => deletePost()} data-test="confirm">Yes, delete it</DeleteStyled>
        </div>
      </Modal>
      <LeftColumn>
        <PostsContainer>
          <Title>{location.pathname?.includes('user') ? userFromQuery?.name + "'s posts" : 'Timeline'}</Title>
          {!location.pathname?.includes('user') && <PostDiv data-test="publish-box">
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
                data-test="link"
              />
              <PostInput
                name="description"
                placeholder="Awesome article about #javascript"
                type="text"
                height={"60px"}
                disabled={isLoading}
                value={form.description}
                onChange={handleForm}
                data-test="description"
              />
              <PostButton type="submit" disabled={isLoading} data-test="publish-btn">
                {isLoading ? "Publishing..." : "Publish"}
              </PostButton>
            </PostForm>
          </PostDiv>}
        </PostsContainer>
        <PostsContainer>
          {posts.length ? posts.map((post) => (
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
              />
              :
              location.pathname?.includes('user') ? null :
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
                />
          ))
            : loaded ? <NoPosts data-test="message">There are no posts yet</NoPosts> : <LoadingParagraph>Loading...</LoadingParagraph>}
        </PostsContainer>
      </LeftColumn>
      <TrendingBar setHashtagName={setHashtagName} setPosts={setPosts} posts={posts}></TrendingBar>
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