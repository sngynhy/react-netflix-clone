import styled from "styled-components";

export const Container = styled.div`
    border: none;
    position: absolute;
    z-index: 999;
    top: 0;
    padding: 30px 25% 0;
    background-color: rgba(0, 0, 0, 0.7);
    // backdrop-filter: blur(5px);
`
export const PreviewPlayer = styled.div`
    position: relative;
    width: 100%;
`
export const IconsOnPlayer = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #181818, transparent 30%), linear-gradient(180deg, #181818, transparent 15%);
    background-repeat: no-repeat;
    background-position: top, bottom;
    border-radius: 8px 8px 0 0;

    & .closeBtn {
        position: absolute;
        right: 0;
        width: 36px;
        height: 36px;
        margin: 12px;
        cursor: pointer;
    }
    & > div {
        position: absolute;
        left:3rem;
        bottom: 2rem;
        display: flex;
    }
`

export const MoreDiv = styled.div`
    border-bottom: 2px solid #404040;
    box-shadow: none;
    display: flex;
    height: 6em;
    justify-content: center;
    margin: auto;
    position: relative;
    width: 100%;

    ${props => !props.$moreview && 'background-image: linear-gradient(0deg, #181818 0, hsla(0, 0%, 9%, .7) 20%, hsla(0, 0%, 9%, .4) 30%, transparent 50%);'}
    ${props => !props.$moreview && 'margin-top: -6em;'}
    & > svg {
        width: 40px;
        height: 40px;
        transform: ${props => props.$moreview ? 'rotate(90deg);' : 'rotate(-90deg);'}
        position: absolute;
        bottom: -20px;
        color: grey;
        cursor: pointer;
    }
    & > svg:hover {
        color: white;
    }
`