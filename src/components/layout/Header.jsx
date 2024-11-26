import React from "react";
import { Link } from 'react-router-dom'
import logo from 'assets/img/logo/logo.png'
import {Wrapper, Nav, NavItem, Account} from 'styles/HeaderStyle'
import { IoSearch } from "react-icons/io5";

function Header () {
    return (
        <Wrapper>
            <Link to="/"><img src={logo} style={{width: 150, verticalAlign:'middle'}} /></Link>
            <Nav>
                <NavItem><Link to="/movie">Movie</Link></NavItem>
                <NavItem><Link to="/tv">TV</Link></NavItem>
                <NavItem><Link to="/netflix-original">Netflix Original</Link></NavItem>
                <NavItem><Link to="/series">Series</Link></NavItem>
                <NavItem><Link to="/search"><IoSearch /></Link></NavItem>
            </Nav>
            <Account>로그인</Account>
        </Wrapper>
    )
}

export default Header