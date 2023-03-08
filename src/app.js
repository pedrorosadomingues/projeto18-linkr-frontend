import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Enter } from "./pages/Enter";
import Home from "./pages/Home/Home";
import AuthProvider from "./contexts/AuthContext";


function App() {
  return (
      <Linkr>
        <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/timeline" element={<Home />} />
            <Route path="/sign-up" element={<Enter mode="signup" />} />
            <Route path="/" element={<Enter mode="signin" />} />
          </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Linkr>
  );
}

const Linkr = styled.div`
  background-color: #333333;
  height: 100vh;

`;

export default App;
