import styled from "styled-components";

export default function Header() {
    return (
        <HeaderContainer>
            <h1>linkr</h1>
            <ProfileImageContainer>
                <ion-icon name="chevron-down-outline"></ion-icon>
                <img src="https://img1.gratispng.com/20180722/ybz/kisspng-user-profile-2018-in-sight-user-conference-expo-5b554c09380f76.0349129615323166812296.jpg"/>
            </ProfileImageContainer >
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    width: 100vw;
    height: 70px;
    background-color: #151515;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    h1 {
        font-family: 'Passion One', cursive;
        font-size: 51px;
        color: #FFF;
        margin-left: 15px;
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