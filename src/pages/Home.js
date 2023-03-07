import styled from "styled-components";
import Header from "../components/Header";

export default function Home() {
    return (
        <HomeContainer>
            <Header />
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    background-color: #171717;

`