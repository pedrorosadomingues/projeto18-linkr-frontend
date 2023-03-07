import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Enter } from "./pages/Enter";

function App() {
  return (
    <Linkr>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<Enter mode="signup"/>} />
          <Route path="/" element={<Enter mode="signin"/>} />
        </Routes>
      </BrowserRouter>
    </Linkr>
  );
}

const Linkr = styled.div`
  background-color: #333333;
  height: 100vh;

`;

export default App;
