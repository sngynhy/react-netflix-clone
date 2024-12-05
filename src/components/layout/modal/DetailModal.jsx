import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from 'api/movieApi';
import styled from "styled-components";

const Wrapper = styled.div`
    border: 1px solid red;
    position: absolute;
    z-index: 999;
`
function DetailModal (props) {
    // const { id } = useParams()
    // const location = useLocation()
    console.log('props', props);

    return (
        <Wrapper>
            <h1>상세 정보 모달</h1>
        </Wrapper>
    )
}

export default DetailModal