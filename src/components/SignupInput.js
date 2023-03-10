import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function SignUpInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  // const { setUserInfos, setIsLoggedIn } = useContext(Context);

  function handleSignup() {
    if (
      email === ''
      || password === ''
      || name === ''
    ) return alert('Algum campo está vazio');
  };

  async function signup(e) {
    e.preventDefault();
    setDisabled(true);

    const postData = {
      email,
      password,
      name,
      imageUrl
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, postData);

      navigate('/');
    } catch (error) {
      console.log(error)
      if (error.response?.status === 409) return alert('Email já cadastrado');
      console.log(error)
      alert(error.message.data);
      setDisabled(false);
    }
    setDisabled(false);
  }

  return (
    <FormStyled onSubmit={(e) => signup(e)}>
      <input
        data-test="email"
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={!disabled ? false : true}
      />
      <input
        data-test="password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={!disabled ? false : true}
      />
      <input
        data-test="username"
        placeholder="username"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={!disabled ? false : true}
      />
      <input
        data-test="picture-url"
        placeholder="picture url"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        disabled={!disabled ? false : true}
        required
      />
      <ButtonStyled
        data-test="sign-up-btn"
        onClick={handleSignup}
        disabled={!disabled ? false : true}
      >
        <p>Sign Up</p>
      </ButtonStyled>
      <button
        data-test="login-link"
        type="button"
        onClick={() => navigate('/')}
      >
        Switch back to log in
      </button>
    </FormStyled>
  );
}

export const ButtonStyled = styled.button`
  background-color: #1877F2;
  width: 100%;
  color: white;
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 20px;
  line-height: 40px;
  border-radius: 8px;
  height: 65px;
  border: none;

  &:disabled {
    opacity: 0.3;
  }
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  
  & > button:last-of-type {
    background-color: transparent;
    border: none;
    text-decoration: underline;
    color: white;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-top: 22px;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    height: 55px;
    border: none;
    border-radius: 8px;
    background-color: #fff;
    padding: 0 18px;
    color: #000000;
    font-size: 27px;
    line-height: 40px;
    margin-bottom: 14px;

    @media (max-width: 1315px) {
      width: 80%;
    }

    @media (max-width: 800px) {
      height: 45px;
    }
  }
  input::placeholder {
    color: #9f9f9f;
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
  }
`;
