import styled from "styled-components";
import Header from "../components/Header";
import Trending from "../components/Trending";

export default function Home() {
    return (
        <HomeContainer>
            <Header />
            <Trending />

        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    background-color: #171717;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    

`