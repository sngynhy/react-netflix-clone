import styled from "styled-components";

export const Wrapper = styled.div`
    height: 5rem;
    padding: 0 40px;
    line-height: 3rem;
`
    // background-color: #000435;
export const Nav = styled.ul`
    display: inline-block;
    list-style: none;
`
export const NavItem = styled.li`
    display: inline-block;
    margin: 0 15px;
    & > a {
        text-decoration: none;
        color: white;
        font-weight: bole;
        font-size: 20px;
    }
`
export const Account = styled.button`
    float: right;
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 30px;
    cursor: pointer;
    margin: 16px 0;
    &:hover {
        background: black;
        color: white
    }
`