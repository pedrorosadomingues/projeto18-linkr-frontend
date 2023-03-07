import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

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
    <HeaderContainer>
      <h1>linkr</h1>
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
          <img src="https://www.guiaviagensbrasil.com/imagens/lindos-coqueiros-praia-itanhaem-sp.jpg" />
        </button>
      </ProfileImageContainer >
      <LogoutStyled
        type="button"
        onClick={logout}
        showLogout={showLogout}
      >
        Logout
      </LogoutStyled>
    </HeaderContainer>
  );
}

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
    z-index: 10;
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