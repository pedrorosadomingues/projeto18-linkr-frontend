import styled from "styled-components";

export default function Header() {
    return (
        <HeaderContainer>
            <h1>linkr</h1>
            <ProfileImageContainer>
                <ion-icon name="chevron-down-outline"></ion-icon>
                <img src="https://www.guiaviagensbrasil.com/imagens/lindos-coqueiros-praia-itanhaem-sp.jpg"/>
            </ProfileImageContainer >
        </HeaderContainer>
    );
}

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
    padding: 0px 28px;
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

`
    ;