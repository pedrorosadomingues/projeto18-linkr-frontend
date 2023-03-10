import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Enter } from "./pages/Enter";
import Home from "./pages/Home/Home";
import HashtagPage from "./pages/HashtagPage";
import AuthProvider from "./contexts/AuthContext";
import 'react-tooltip/dist/react-tooltip.css'


function App() {
  const [posts, setPosts] = useState([]);
  const [hashtagName, setHashtagName] = useState("");
  

  return (
    <Linkr>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/timeline" element={<Home posts={posts} setPosts={setPosts} setHashtagName={setHashtagName}/>} />
            <Route path="/sign-up" element={<Enter mode="signup" />} />
            <Route path="/" element={<Enter mode="signin" />} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage posts={posts} setPosts={setPosts} hashtagName={hashtagName} setHashtagName={setHashtagName}/>} />
            <Route path="/user/:id" element={<Home posts={posts} setPosts={setPosts} setHashtagName={setHashtagName}/>} />
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
