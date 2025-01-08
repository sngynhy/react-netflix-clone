import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding-top: 8rem;
    padding-bottom: 4rem;
    text-align: center;
    & > p {
        font-size: 15px;
        color: white;
    }
`

export const Footer = memo(function Footer() {
    return (
        <Container id="footer">
           <p>@2024 Made by sngynhy</p>
        </Container>
    )
})