import styled from "styled-components";
import { media } from "../utils/mediaQuery";
import { videoHeight } from "utils/mediaSize"; 

export const MainCoverImg = styled.div`
    background-image: url(${props => props.$url});
    background-size: 100% 100%; // cover; // 
    background-position: center center;
    ${media.large`
        height: ${videoHeight.lg - 1}px;
    `}
    ${media.medium`
        height: ${videoHeight.md - 1}px;
    `}
    ${media.small`
        height: ${videoHeight.sm - 1}px;
    `}
    width: 100%;
    margin-bottom: 0px;
    ${props => props.$maskeffect && 'mask-image: linear-gradient(180deg, #181818, transparent 90%);'} // linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4));
    mask-size: 100% 120%;
    mask-repeat: no-repeat;
    position: absolute;
    z-index: 0;
`
export const Wrapper = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    ${media.large`
        height: ${videoHeight.lg - 200}px;
    `}
    ${media.medium`
        height: ${videoHeight.md - 150}px;
    `}
    ${media.small`
        height: ${videoHeight.sm}px;
    `}
    margin-top: 4rem;
`
export const SelectBox = styled.div`
    width: calc(100% - 120px);
    ${media.large`
        height: 4rem;
        padding: 0 60px;
    `}
    ${media.medium`
        height: 4rem;
        padding: 0 40px;
    `}
    ${media.small`
        height: 0;
        padding: 0 20px;
    `}
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: flex-start;
    position: absolute;
    z-index: 2;
    background-color: ${props => props.$scrollTop || props.$isModalOpen ? 'transparent' : 'black'};
    position: fixed;
    transition: 0.5s;
    
    & > span {
        margin-right: 15px;
        ${media.large`
            font-size: 2.5rem;
        `}
        ${media.medium`
            font-size: 2rem;
        `}
        ${media.small`
            font-size: 1rem;
        `}
    }
    & > .selectBox {
        border: 1px solid white;
        width: auto; // 95px;
        ${media.large`
            margin: 0 40px;
        `}
        ${media.medium`
            margin: 0 40px;
        `}
        ${media.small`
            margin: 0 20px;
        `}
        cursor: pointer;
        display: inline-block;
        position: relative;
        background-color: ${props => props.$openGenreBox ? 'hsla(0,0%,100%,.1);' : 'black;'};
    }
    & > .selectBox:hover {
        background-color: hsla(0,0%,100%,.1);
    }
    & > .selectBox > .selectIndex {
        ${media.large`
            padding: 5px 10px;
        `}
        ${media.medium`
            padding: 2px 10px;
            font-size: 1rem;
        `}
        ${media.small`
            padding: 2px 10px;
            font-size: 0.8rem;
        `}
    }
    & > .selectBox > .selectBoxOptions {
        position: absolute;
        z-index: 3;
        ${media.large`
            top: 34px;
            width: 420px;
        `}
        ${media.medium`
            top: 30px;
            width: 420px;
        `}
        ${media.small`
            top: 24px;
            width: 280px;
        `}
        background-color: rgba(0,0,0,.9);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
    & > .selectBox > .selectBoxOptions > div > span:hover {
        border-bottom: 2px solid white;
    }
`
export const CoverContentText = styled.div`
    ${media.large`
        padding: 0 60px;
    `}
    ${media.medium`
        padding: 0 40px;
    `}
    ${media.small`
        padding: 0 20px;
    `}
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: flex-start;
    position: absolute;
    bottom: 10%;

    & > h2 {
        font-size: 50px;
        margin: 15px 0;
    }
    & > p {
        width: 40%;
        font-size: 1.2vw;
        margin: 0 15px 0 0;
    }
`
export const DetailViewButton = styled.button`
    ${media.large`
        padding: 0.6rem 1.6rem;
        font-size: 20px;
    `}
    ${media.medium`
        padding: 0.6rem 1.6rem;
        font-size: 20px;
    `}
    ${media.small`
        padding: 0.3rem 0.8rem;
        font-size: 0.8rem;
    `}
    border-radius: 4px;
    border: none;
    cursor: pointer;
    color: white;
    background-color: rgba(109, 109, 110, 0.7);
    & > svg {
        margin-right: 8px;
    }
    &:hover {
        color: white;
        background-color: rgba(109, 109, 110, 0.4);
    }
`
export const Overview = styled.p`
    transition:  1s;
    transform: ${props => props.$lowerTitle ? 'translateY(100px)' : 'translateY(0)'};
    opacity: ${props => props.$lowerTitle ? 0 : 1};
`