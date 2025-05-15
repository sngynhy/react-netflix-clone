import styled from "styled-components";
import { media } from "../utils/mediaQuery";

export const Container = styled.div`
    height: 4rem;
    width: 100%;
    background-color: ${props => props.$scrollTop || props.$isModalOpen ? 'transparent' : 'black'};
    background-image: linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent);
    position: fixed;
    z-index: 999;
    transition: 0.5s;

    & > .navigator {
        height: 100%;
        padding: 0 60px;
        position: relative;

        ${media.large`
            padding: 0 60px;
        `}
        ${media.medium`
            padding: 0 40px;
        `}
        ${media.small`
            padding: 0 20px;
        `}

        & > a > img {
            vertical-align: middle;
            ${media.large`
                width: 7rem;
            `}
            ${media.medium`
                width: 7rem;
            `}
            ${media.small`
                width: 4rem;
            `}
        }
    }
`
export const Nav = styled.ul`
    display: inline-block;
    list-style: none;
    ${[media.large, media.medium].map((breakpoint) => breakpoint`
        padding-inline-start: 20px;
    `)}
    ${media.small`
        padding-left: 20px;
    `}
`
export const Toggle = styled.div`
    position: absolute;
    left: 0;
    & > div {
        text-align: center;
        width: 15rem;
        height: 12px;
        color: rgb(179, 179, 179);
    }
`
export const NavOptions = styled.div`
    border-top: 2px solid rgb(179, 179, 179);
    width: 15rem;

    & > ul {
        background: rgba(0, 0, 0, 0.9);
        list-style: none;
        padding: 0;
        margin: 0;

        & > li {
            height: 3rem;
            line-height: 3rem;
            text-align: center;

            & > a {
            text-decoration: none;
            font-size: 0.9rem;
        }
    }
`
export const NavItem = styled.li`
    display: inline-block;
    margin: 0 12px;
    vertical-align: middle;
    & > a {
        text-decoration: none;
        color: #e5e5e5;
        font-size: 16px;
    }
`
export const CategoryText = styled.span`
    ${[media.large, media.medium].map((breakpoint) => breakpoint`
        border-bottom: ${props => props.$selected ? '2px solid red' : 'none'};
        color: ${props => props.$selected ? 'white' : '#e5e5e5'};
        &:hover {
            color: #b3b3b3;
        }
    `)}
    ${media.small`
        color: ${props => props.$selected ? 'white' : '#b3b3b3'};
        border-bottom: none;
    `}
`

export const Search = styled.div`
    display: flex;
    float: right;
    margin: 16px 0;
    align-items: center;
`
export const SearchBox = styled.div`
    border: ${props => props.$open ? '1px solid white' : 'none'};
    ${[media.large, media.medium].map((breakpoint) => breakpoint`
        height: 34px;
    `)}
    ${media.small`
        height: 24px;
    `}
    display: flex;
    align-items: center;
    vertical-align: middle;
    & > input {
        background: rgba(0, 0, 0, 0);
        border: none;
        outline: none;
        padding: 10px;
        color: white;
        ${[media.large, media.medium].map((breakpoint) => breakpoint`
            width: 182px;
        `)}
        ${media.small`
            width: 100px;
        `}
    }
`
export const SearchIcon = styled.label`
    height: inherit;
    & > svg {
        cursor: Pointer;
        ${[media.large, media.medium].map((breakpoint) => breakpoint`
            width: 25px;
            height: 25px;
        `)}
        ${media.small`
            width: 15px;
            height: 15px;
        `}
        margin: 5px;
    }
`