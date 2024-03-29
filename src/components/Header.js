import axios from "axios";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useHistory, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header({ user }) {
  const [showLogout, setShowLogout] = useState(false);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  async function getUsers() {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token && token !== '') {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          }
        };
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/get-users`, {name: search}, config);

        console.log('Users from search: ', data)
        setUsers(data);

      } catch (error) {
        console.log(error);

        throw new Error(error);
      }
    }
  };


  useEffect(() => {
    async function fetchData() {
      const usersData = await getUsers();

      return usersData;
    }
    fetchData();

    // console.log(search);
  }, [search]);

  async function logout() {
    setShowLogout(!showLogout);
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);

    try {
      const config = {
        authentication: `Bearer ${token}`,
      };

      await axios.delete(`${process.env.REACT_APP_API_URL}/logout`, config);

      localStorage.removeItem('token');

      navigate('/');
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }


  return (
    <HeaderContainer data-test="menu">
      <WallStyled
        showLogout={showLogout}
        onClick={() => setShowLogout(false)}
      >

      </WallStyled>
      <h1><a href="/timeline">linkr</a></h1>
      <Input
        placeholder="Search for people"
        minLength={3}
        debounceTimeout={300}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
        data-test="search"
      />
      <UsersFromSearch
        display={(search.length >= 3).toString()}
      >
        {
          users?.map(({imageUrl, name, id, is_followed}, index) => (
            <UserFromSearch key={index} data-test="user-search" onClick={() => {
              navigate(`/user/${id}`)
              setSearch('')
              window.location.reload();
           
            }}>
              <img alt="profile" src={imageUrl} />
              <button >{name}</button>
              { is_followed === true && <p>• following</p>}
            </UserFromSearch>
          ))
        }
      </UsersFromSearch>
      <ProfileImageContainer>
        <button
          type="text"
          onClick={() => setShowLogout(!showLogout)}
        >
          <ion-icon name={`chevron-${showLogout ? 'up' : 'down'}-outline`}></ion-icon>
        </button>
        <button
          type="button"
          onClick={() => setShowLogout(!showLogout)}
        >
          <img src={user.imageUrl} data-test="avatar"/>
        </button>
      </ProfileImageContainer >
      <LogoutStyled
        type="button"
        onClick={logout}
        showLogout={showLogout}
        data-test="logout"
      >
        Logout
      </LogoutStyled>
    </HeaderContainer >
  );
}

const WallStyled = styled.button`
  position: absolute;
  top: 0;
  min-height: 100vh;
  min-width: 100vw;
  background-color: transparent;
  border: none;
  display: ${({ showLogout }) => showLogout ? 'block' : 'none'};
`;
const Input = styled(DebounceInput)`
    max-width: 563px;
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    border:none;
    font-family: 'Lato';
    font-size: 19px;
    line-height: 23px;
    font-weight: 400;
    padding-left: 15px;
    &::placeholder{
      color: #C6C6C6;
    }
`


const LogoutStyled = styled.button`
    position: absolute;
    right: 0;
    top: 100%;
    border-radius: 8px;
    border: none;
    background-color: #151515;
    color: white;
    padding: 15px;
    display: ${({ showLogout }) => showLogout ? 'block' : 'none'};
`;

const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    background-color: #151515;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 28px;
    z-index: 10;

    a:visited {
      color: white;
    }

    h1 {
        font-family: 'Passion One', cursive;
        color: #FFF;
        font-size: 49px;
        line-height: 54px;
        letter-spacing: 0.05em;
    }

`;

const ProfileImageContainer = styled.div`
    display: flex;
    align-items: center;
    ion-icon {
        font-size: 20px;
        color: #FFF;
    }
    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
        margin-left: 18px;
        
    }

    button {
      background-color: transparent;
      border: none;
    }

`
  ;

const UsersFromSearch = styled.ul`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translate(-50%);
  min-height: 200px;
  min-width: 400px;
  background-color: #e7e7e7;
  border: none;
  border-radius: 8px;
  display: ${({ display }) => display === 'true' ? 'block' : 'none'};
`;

const UserFromSearch = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;

  & button {
    background-color: transparent;
    border: none;
    font-size: 19px;
    color: #515151;
  }
  & button:hover {
    cursor: pointer;
  }

  & img {
    height: 39px;
    width: 39px;
    border-radius: 50%;
    margin-right: 12px;
  }
`;