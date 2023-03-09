import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TrendingBar() {
    const [trendingHashtags, setTrendingHashtags] = useState([]);

    const config = { 
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }

    useEffect(() => {
        const request = axios.get(process.env.REACT_APP_API_URL + "/hashtag", {config});
        request.then(response => {
            setTrendingHashtags(response.data);
        });
        request.catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <TrendingContainer>
            <h1>trending</h1>
            <ul>
                {trendingHashtags.map((hashtag, index) => (
                    <li key={index}>
                        <span>{hashtag.name}</span>
                    </li>
                ))}
            </ul>
        </TrendingContainer>
    );
}

const TrendingContainer = styled.div`
    width: 301px;
    height: 100%;
    background-color: #171717;
    border-radius: 16px;
    padding: 20px;
    margin-top: 280px;
    margin-left: 75px;
    h1 {
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        color: #FFF;
        margin-bottom: 20px;
        border-bottom: #333333 1px solid;
    }
    ul {
        li {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            span {
                font-family: 'Lato', sans-serif;
                font-size: 19px;
                color: #FFF;
                margin-left: 10px;
            }
            
        }
    }
    
`;
