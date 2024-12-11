import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding-top: 8rem;
    padding-bottom: 4rem;
    text-align: center;
    & > p {
        font-size: 15px;
        color: white;
    }
`

function Footer () {
    return (
        <Wrapper id="footer">
           <p>@2024 Made by sngynhy</p>
        </Wrapper>
    )
}

export default Footer