import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonStyled, FormStyled } from "./SignupInput";

export function SignInInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  function handleSignup() {
    if (
      email === ''
      || password === ''
    ) return alert('Algum campo está vazio');
  };

  async function signin(e) {
    e.preventDefault();
    setDisabled(true);

    const postData = {
      email,
      password,
    };

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/`, postData);
      const { token } = data;

      localStorage.setItem('token', JSON.stringify(token));

      navigate('/timeline');
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        alert('E-mail ou senha inválidos!');
      } else {
        if (error.response.status === 409) return alert('Email já cadastrado');
        console.log(error)
        alert(error.message.data);
      }
      setDisabled(false);
    }
    setDisabled(false);
  }

  return (
    <FormStyled onSubmit={(e) => signin(e)}>
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
      <ButtonStyled
        data-test="login-btn"
        onClick={handleSignup}
        disabled={!disabled ? false : true}
      >
        <p>Log In</p>
      </ButtonStyled>
      <button
        data-test="sign-up-link"
        type="button"
        onClick={() => navigate('/sign-up')}
      >
        First time? Create an account!
      </button>
    </FormStyled>
  )
}