import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    background: $color-background;
    padding-top: 10rem;
    padding-bottom: 4rem;
    text-align: center;
    & > p {
        font-size: 14px;
        color: white;
    }
`

function Footer () {
    return (
        <Wrapper>
           <p>@2024 Made by sngynhy</p>
       </Wrapper>
    )
}

export default Footer