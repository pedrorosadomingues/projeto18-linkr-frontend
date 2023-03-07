import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Linkr>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Linkr>
  );
}

const Linkr = styled.div`
  background-color: #333333;
  height: 100vh;
  width: 100vw;

`;

export default App;
