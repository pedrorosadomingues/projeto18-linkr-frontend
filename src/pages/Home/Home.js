import { Container, ImageDiv, PostDiv, PostButton, PostForm, PostInput, PostsContainer, Title, NoPosts, LoadingParagraph, TitlesStyled, TrendingStyled, FollowButton, NewPostsButton, ReloadIcon } from "./styled"
import axios from "axios"
import styled from "styled-components";
import Header from "../../components/Header";
import Post from "../../components/Post/Post"
import { useContext, useEffect, useRef, useState } from "react";
import TrendingBar from "../../components/TrendingBar";
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";
import useInterval from 'use-interval';

Modal.setAppElement(document.getElementById('root'));

export default function Home({ posts, setPosts, setHashtagName }) {
  const [form, setForm] = useState({ url: "", description: "" });
  const [isLoading, setIsLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [followersQuantity, setFollowersQuantity] = useState(null);
  const token = JSON.parse(localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modal2IsOpen, setIsOpen2] = useState(false);
  const [postId, setPostId] = useState(undefined);
  const [userFromQuery, setUserFromQuery] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [difference, setDifference] = useState(0);
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

  async function getFollowings() {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token && token !== '') {
      // setIsLoading(true);
      try {
        //console.log('TOKEN: ', token)
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          }
        };
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/followers`, config);
        //console.log('dattta', data)
        setFollowersQuantity(Number(data[0].num_following));

      } catch (error) {
        console.log(error);

        throw new Error(error);
      } finally {
        // setIsLoading(false);
      }
    }
  };

  async function getIsFollowing(id) {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token && token !== '') {
      try {
        //console.log('TOKEN: ', token)
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          }
        };
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/get-follower-by-id`, { id }, config);
        console.log(data)
        setIsFollowing(data.isFollowing);

      } catch (error) {
        console.log(error);

        throw new Error(error);
      }
    }
  };

  async function follow(id) {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token && token !== '') {
      setIsLoading(true);

      try {
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          }
        };
        await axios.post(`${process.env.REACT_APP_API_URL}/followers`, { followed: id }, config);

      } catch (error) {
        console.log(error);

        alert('Não foi possível executar a operação')

        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  async function unfollow(id) {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token && token !== '') {
      setIsLoading(true);

      try {
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          }
        };
        await axios.delete(`${process.env.REACT_APP_API_URL}/followers/${id}`, config);

      } catch (error) {
        console.log(error);

        alert('Não foi possível executar a operação')

        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  async function getUserById(id) {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token && token !== '') {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          }
        };
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/get-user-by-id`, { id }, config);

        setUserFromQuery(data[0]);

      } catch (error) {
        console.log(error);

        alert('Não foi possível executar a operação')

        throw new Error(error);
      }
    }
  };

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const { pathname } = location;
    getFollowings();

    if (pathname.includes('user')) {
      const index = pathname.lastIndexOf("/");
      const result = pathname.substring(index + 1);

      getUserById(Number(result));
      getIsFollowing(Number(result));
    }

    axios.get(`${process.env.REACT_APP_API_URL}/get-user`, config)
      .then((res) => {
        //console.log(res.data)
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err)
        alert("You are not logged!");
      })

    const isProfile = location.pathname?.includes('user');

    const promise = axios.get(
      `${process.env.REACT_APP_API_URL}/${isProfile ?
        'user/' + location.pathname.substring(location?.pathname?.lastIndexOf("/") + 1) :
        'timeline'}`, config);

    promise.then((res) => {
      setPosts(res.data)
      setDifference(0)
      setLoaded(true)
    })
      .catch((err) => {
        console.log(err)
        alert("An error occured while trying to fetch the posts, please refresh the page");
      }).then(setLoaded(false))
  }, [loaded, isLoading])

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

  function openModal2(id) {
    setIsOpen2(true);
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/get-user`, config)
      .then((res) => {
        setUser(res.data)

      })
      .catch((err) => {
        console.log(err)
        alert("You are not logged!");
      })

    const isProfile = location.pathname?.includes('user');

    const promise = axios.get(
      `${process.env.REACT_APP_API_URL}/${isProfile ?
        'user/' + location.pathname.substring(location?.pathname?.lastIndexOf("/") + 1) :
        'timeline'}`, config);

    const promise2 = axios.get(
      `${process.env.REACT_APP_API_URL}/${isProfile ?
        'user/' + location.pathname.substring(location?.pathname?.lastIndexOf("/") + 1) :
        'shares'}`, config);
    promise2.then(r => console.log('DATA FROM SHARES: ', r));

    promise.then((res) => {
      //console.log('POSTS INFO: ', res.data)
      //console.log('USER INFO: ', user)
      setPosts(res.data)
      setLoaded(true)
    })
      .catch((err) => {
        console.log(err)
        alert("An error occured while trying to fetch the posts, please refresh the page");
      }).then(setLoaded(false))
  }, [loaded, isLoading])

  async function handlePost(e) {
    e.preventDefault();
    let getHashtags = form.description.split(' ').filter((word) => word.startsWith('#'))
    // console.log('getHashtags:', getHashtags)

    setIsLoading(true);
    const body = { ...form }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/timeline`, body, config);
      //console.log("funcionou");
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

  useInterval(async () => {
    console.log("New interval")
    try {
      const newPosts = await axios.get(`${process.env.REACT_APP_API_URL}/timeline`, config)
      const newestPost = newPosts.data[0]
      const oldNewestPost = posts[0]
   
      if(newestPost.post_id !== oldNewestPost.post_id){
        console.log("há diferença")
          setDifference(-(0 - newPosts.data.findIndex(x => x.post_id === oldNewestPost.post_id)))
      }
  
    } catch (error) {
      console.log(error)
      alert("Error in getting new posts")
    }
    
  }, 15000);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'white';
  }
  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'white';
  }

  function closeModal(hasError) {
    if (hasError) return alert('Não foi possível excluir o post');
    setPostId(undefined);
    setIsOpen(false);
  }
  function closeModal2(hasError) {
    if (hasError) return alert('Não foi possível repostar o post');
    setPostId(undefined);
    setIsOpen2(false);
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

  async function sharePost() {
    try {
      setLoaded(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/shares`, { postId }, config);
      setLoaded(false);
    } catch (error) {
      console.log(error)
      closeModal2(true);
    }
    setLoaded(false);
    closeModal2();
  }

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
      <Modal
        isOpen={modal2IsOpen}
        onAfterOpen={afterOpenModal2}
        onRequestClose={() => closeModal2(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Do you want to re-post
          this link?</h2>
        <h2>{loaded && 'Sharing post...'}</h2>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <NoDeleteStyled data-test="cancel" onClick={() => closeModal2(false)}>No, cancel</NoDeleteStyled>
          <DeleteStyled data-test="confirm" onClick={() => sharePost()}>Yes, share!</DeleteStyled>
        </div>
      </Modal>
      <LeftColumn>
        <PostsContainer>
          <TitlesStyled>
            <Title>{location.pathname?.includes('user') ? userFromQuery?.name + "'s posts" : 'Timeline'}</Title>
          </TitlesStyled>
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
        {difference > 0 ? <NewPostsButton data-test="load-btn" onClick={()=> setLoaded(false)}>
          {difference} new posts, load more! <ReloadIcon></ReloadIcon>
        </NewPostsButton> : ""}
        <PostsContainer>
          {posts.length ? posts.map((post, index) => (
            location.pathname?.includes('user') && location.pathname.substring(location?.pathname?.lastIndexOf("/") + 1) === String(post.user_id) ?
              <Post
                key={post.post_id + (post?.shared_by_user_name ?? 'null') + index}
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
                sharePost={() => {
                  setPostId(post.post_id);
                  openModal2(post.post_id);
                }}

                setHashtagName={setHashtagName}
              />
              :
              location.pathname?.includes('user') ? null :
                <Post
                  key={post.post_id + (post?.shared_by_user_name ?? 'null') + index}
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
                  sharePost={() => {
                    setPostId(post.post_id);
                    openModal2(post.post_id);
                  }}

                  setHashtagName={setHashtagName}
                />
          ))
            : loaded ? <NoPosts data-test="message">{followersQuantity > 0 ? 'No posts found from your friends' : 'You don\'t follow anyone yet. Search for new friends!'}</NoPosts> : <LoadingParagraph>Loading...</LoadingParagraph>}
        </PostsContainer>
      </LeftColumn>
      {
        (location.pathname?.includes('user') && Number(location.pathname.substring(location?.pathname?.lastIndexOf("/") + 1)) !== Number(user.id)) ?
          <FollowButton
            data-test="follow-btn"
            type="button"
            disabled={isLoading}
            isFollowing={isFollowing}
            onClick={() => {
              const id = location.pathname.substring(location?.pathname?.lastIndexOf("/") + 1)
              return isFollowing ? unfollow(id) : follow(id)
            }}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </FollowButton>
          : null
      }

      <TrendingBar loaded={loaded} setHashtagName={setHashtagName} setPosts={setPosts} posts={posts}></TrendingBar>
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