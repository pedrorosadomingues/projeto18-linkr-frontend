import styled from "styled-components"
import { SignInInput } from "../components/SignInInput";
import { SignUpInput } from "../components/SignupInput";

export function Enter({mode}) {
  return (
    <EnterStyled>
      <LeftStyled>
        <TextStyled>
          <h2>linkr</h2>
          <p>save, share and discover
            the best links on the web</p>
        </TextStyled>
      </LeftStyled>
      <RightStyled>
        {mode === 'signup' ? <SignUpInput /> : < SignInInput/>}
      </RightStyled>
    </EnterStyled>
  )
}

const EnterStyled = styled.div`
  /* background-color: red; */
  min-height: 100vh;
  display: flex;
  font-family: 'Oswald', sans-serif;
  `;

const LeftStyled = styled.div`
  color: white;
  position: relative;
  background-color: #151515;
  width: calc((2 / 3) * 100%);
`;

const RightStyled = styled.div`
  width: calc((1 / 3) * 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextStyled = styled.div`
  position: absolute;
  left: 20%;
  top: 15%;
  width: 400px;
  font-size: 43px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: rebeccapurple; */

  & h2 {
    font-family: 'Passion One', cursive;
    font-size: 106px;
  }
`;