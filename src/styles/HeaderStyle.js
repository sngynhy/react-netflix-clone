import styled from "styled-components";

export const Wrapper = styled.div`
    height: 5rem;
    padding: 0 40px;
    line-height: 3rem;
`
export const Nav = styled.ul`
    display: inline-block;
    list-style: none;
`
export const NavItem = styled.li`
    display: inline-block;
    margin: 0 15px;
    vertical-align: middle;
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
    margin-left: 20px;
    font-size: 16px;
    border: 1px solid white;
    border-radius: 30px;
    cursor: pointer;
    background: white;
    color: black;
    &:hover {
        background: black;
        color: white;
        border: 1px solid white;
    }
`
export const SearchBox = styled.div`
    border: ${props => props.open ? '1px solid white' : 'none'};
    height: 30px;
    display: flex;
    align-items: center;
    & > input {
        background: rgba(0, 0, 0, 0);
        border: none;
        outline: none;
        padding: 8px;
        color: white;
    }
`