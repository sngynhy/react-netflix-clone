import styled from "styled-components";

export const Wrapper = styled.div`
    height: 5rem;
    width: 100%;
    line-height: 3rem;
    background: transparent;
    background-image: linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent);
    position: fixed;
    z-index: 10;
`
export const Container =  styled.div`
    padding: 0 40px;
    height: 100%;
`
export const Nav = styled.ul`
    display: inline-block;
    list-style: none;
    padding-inline-start: 20px;
`
export const NavItem = styled.li`
    display: inline-block;
    margin: 0 15px;
    vertical-align: middle;
    & > a {
        text-decoration: none;
        color: white;
        font-weight: bole;
        font-size: 17px;
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

export const styles = {
    rightItems: {
        display: 'flex',
        float: 'right',
        height: '100%',
        alignItems: 'center'
    },
    searchIcon: {
        cursor: 'Pointer',
        width: '25px',
        height: '25px',
        margin: '5px'
    }
}