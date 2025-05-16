import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 8rem 0 4rem;
    text-align: center;
    & > p > a {
        font-size: 15px;
        color: white;
        text-decoration: none;
    }
`

export const Footer = memo(function Footer() {
    return (
        <Container id="footer">
            <p>
                <a href="https://github.com/sngynhy/react-netflix-clone" target="blank">@2024 Made by sngynhy</a>
            </p>
        </Container>
    )
})