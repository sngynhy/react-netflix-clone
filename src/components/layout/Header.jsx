import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import logo from 'assets/img/logo/logo.png'
import {Wrapper, Nav, NavItem, Account, SearchBox} from 'styles/HeaderStyle'
import { IoSearch, IoCloseSharp } from "react-icons/io5";

const styles = {
    rightItems: {
        display: 'flex',
        float: 'right',
        height: '100%',
        alignItems: 'center'
    },
    searchIcon: {
        cursor: 'Pointer',
        width: '20px',
        height: '20px',
        margin: '5px'
    }
}

function Header () {
    const [openSearchInput, setOpenSearchInput] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    
    const searchRef = useRef(null)

    useEffect(() => {
        // 특정 영역 외 클릭 시 이벤트 발생
    	function outSideClick(e) {
        	if (openSearchInput && searchRef.current && !searchRef.current.contains(e.target)) {
            	setOpenSearchInput(false)
            }
        }
        
        // 이벤트 리스너에 outSideClick 함수 등록
        document.addEventListener("mousedown", outSideClick);
        return () => { document.removeEventListener("mousedown", outSideClick); }
    }, [searchRef])

    function search (keyword) {
        setSearchKeyword(keyword)
        // 검색 페이지 이동 props로 keyword 넘겨주기
    }
    return (
        <Wrapper>
            <Link to="/"><img src={logo} style={{width: 150, verticalAlign:'middle'}} /></Link>
            <Nav>
                <NavItem><Link to="/movie">Movie</Link></NavItem>
                <NavItem><Link to="/tv">TV</Link></NavItem>
                <NavItem><Link to="/netflix-original">Netflix Original</Link></NavItem>
                <NavItem><Link to="/series">Series</Link></NavItem>
            </Nav>
            <div style={styles.rightItems}>
                <SearchBox open={openSearchInput}>
                    <label ref={searchRef} htmlFor="searchInput" style={{height: 'inherit'}}><IoSearch onClick={() => setOpenSearchInput(prev => !prev)} style={styles.searchIcon}/></label>
                    {openSearchInput && <><input type="text" id="searchInput" placeholder="제목, 장르, 사람" value={searchKeyword} onChange={(e) => search(e.target.value)} /><IoCloseSharp onClick={() => setSearchKeyword('')} style={styles.searchIcon}/></>}
                </SearchBox>
                <Link to="/"><Account>로그인</Account></Link>
            </div>
        </Wrapper>
    )
}

export default Header