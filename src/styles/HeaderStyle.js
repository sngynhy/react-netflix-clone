import styled from "styled-components";

export const Container = styled.div`
    height: 4rem;
    width: 100%;
    background-color: ${props => props.$scrollTop || props.$isModalOpen ? 'transparent' : 'black'};
    background-image: linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent);
    position: fixed;
    z-index: 999;
    transition: 0.5s;
`
export const Wrapper =  styled.div`
    padding: 0 60px;
    height: 100%;
`
export const Nav = styled.ul`
    display: inline-block;
    list-style: none;
    padding-inline-start: 20px;
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
    border-bottom: ${props => props.$selected ? '2px solid red' : 'none'};
    color: ${props => props.$selected ? 'white' : '#e5e5e5'};
    &:hover {
        color: #b3b3b3;
    }
`
export const SearchBox = styled.div`
    border: ${props => props.$open ? '1px solid white' : 'none'};
    height: 34px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    & > input {
        background: rgba(0, 0, 0, 0);
        border: none;
        outline: none;
        padding: 10px;
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