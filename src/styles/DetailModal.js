import styled from "styled-components";
import { media } from "../utils/mediaQuery";

export const Wrapper = styled.div`
    border: none;
    position: absolute;
    z-index: 999;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    // backdrop-filter: blur(5px);
    ${media.large`
        padding: 30px 25% 0;
        min-width: 50%;
        min-height: calc(100vh - 30px);
    `}
    ${media.medium`
        padding: 30px 2% 0;
    `}
    ${media.small`
        padding: 20px 2% 0;
    `}
`
export const PreviewPlayer = styled.div`
    position: relative;
    width: 100%;

    & > .top-content {
        height: 100%;
        position: relative;
        
        & > .video {
            background-size: cover;
            width: 100%;
            height: ${props => props.$videoHeight}px;
            border-radius: 8px 8px 0 0;
        }

        & > .logo {
            position: absolute;
            width: 60%;
            bottom: 100px;
            left: 3rem;
        }
    }
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

    & > .close-btn {
        position: absolute;
        right: 0;
        width: 36px;
        height: 36px;
        margin: 12px;
        cursor: pointer;
        border: 1px solid black;
        border-radius: 50%;
        background-color: black;
    }
    & > .close-btn > svg {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 2px;
        left: 2px;
    }
    & > .bottom-btns {
        position: absolute;
        display: flex;
        bottom: 2rem;
        // height: 46px;
        // line-height: 46px;
        
        ${media.large`
            left: 3rem;
            & > div {
                margin-right: 10px;
            }
        `}
        ${media.medium`
            left: 2rem;
            & > div {
                margin-right: 10px;
            }
        `}
        ${media.small`
            left: 2rem;
            & > div {
                margin-right: 6px;
            }
        `}
        }
    }
`

export const SummaryInfo = styled.div`
    display: grid;
    grid-template-columns: minmax(0,2fr) minmax(0,1fr);
    column-gap: 2rem;

    ${media.large`
        & > .left-area {
            padding-right: 1rem; // 0.8rem

            & > .additional-info {
                display: flex;
                margin-bottom: 12px;
                font-size: 84%;
            }
            & > .overview {
                font-size: 84%;
            }
        }
        & > .right-area {
            font-size: 14px;
        }
    `}
    ${media.medium`
        & > .left-area {
            padding-right: 1rem;

            & > .additional-info {
                display: flex;
                margin-bottom: 12px;
            }
        }
        & > .right-area {
            font-size: 14px;
        }
    `}
    ${media.small`
        & > .left-area {
            padding-right: 0.8rem;

            & > .additional-info {
                display: flex;
                margin-bottom: 12px;
                font-size: 84%;
            }
            & > .overview {
                font-size: 72%;
            }
        }
        & > .right-area {
            font-size: 84%;
        }
    `}
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
    ${media.medium`
        height: ${props => props.$moreview ? '3em;' : '6rem;'}
    `}
    ${media.small`
        height: ${props => props.$moreview ? '1em;' : '6rem;'}
    `}

    ${props => !props.$moreview && 'background-image: linear-gradient(0deg, #181818 0, hsla(0, 0%, 9%, .7) 20%, hsla(0, 0%, 9%, .4) 30%, transparent 50%);'}
    ${props => !props.$moreview && 'margin-top: -6em;'}
    & > svg {
        transform: ${props => props.$moreview ? 'rotate(90deg);' : 'rotate(-90deg);'}
        position: absolute;
        color: grey;
        cursor: pointer;

        ${media.large`
            width: 40px;
            height: 40px;
            bottom: -20px;
        `}
        ${media.medium`
            width: 35px;
            height: 35px;
            bottom: -20px;
        `}
        ${media.small`
            width: 25px;
            height: 25px;
            bottom: -15px;
        `}
    }
    & > svg:hover {
        color: white;
    }
`
export const Span = styled.span`
    cursor: pointer;
    &:hover {
        border-bottom: 1px solid white;
    }
`