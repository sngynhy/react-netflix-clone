import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoWarning } from "react-icons/io5";
import { Helmet } from "react-helmet";

function NotFound () {
    const navigate = useNavigate()
    const goHome = () => {
        navigate('/')
    }
    return (
        <div id="error" style={{position: 'relative'}}>
            <Helmet>
                <title>넷플릭스</title>
            </Helmet>

            <MainCover id='cover-image' $maskeffect={true}/>

            <Container>
                <Wrapper>
                    <WarnIcon id="wran-icon" style={{width: '100px', height: '100px'}}>
                        <IoWarning />
                    </WarnIcon>
                </Wrapper>
                <Wrapper>
                    <h1>페이지를 찾을 수 없습니다.</h1>
                </Wrapper>
                <Wrapper>
                    <Button onClick={goHome}>Netflix 홈</Button>
                </Wrapper>
            </Container>
        </div>
    )
}

const MainCover = styled.div`
    background-image: url(https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/KR-ko-20241118-TRIFECTA-perspective_39e1ee1c-668b-451c-ac1b-2f61698a6a44_large.jpg);
    height: 800px;
    margin-bottom: 0px;
    mask-image: linear-gradient(180deg, #181818, transparent 90%); // linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4));
    // mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
    mask-size: 100% 120%;
    mask-repeat: no-repeat;
    // mask-position: center bottom;
    // -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
    // -webkit-mask-size: 100% 120%;
    // -webkit-mask-position: center bottom;

    position: absolute;
    z-index: 0;
    width: 100%;
`
const Container = styled.div`
    padding-top: 300px;
    position: absolute;
    width: 100%;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    color: #ffffffbf;
`
const WarnIcon = styled.span`
    width: 80px;
    height: 80px;
    & > svg {
        width: inherit;
        height: inherit;
        color: #ffffffbf;
    }
`
const Button = styled.div`
    border: 1px solid #ffffffbf;
    padding: 10px 30px;
    font-size: 24px;
    border-radius: 4px;
    color: black;
    background-color: #ffffffbf;
    font-weight: 500;
    cursor: pointer;
`
export default NotFound