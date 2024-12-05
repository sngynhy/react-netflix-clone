import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useMatch } from 'react-router-dom'
import logo from 'assets/img/logo/logo.png'
import {Wrapper, Container, Nav, NavItem, CategoryText, Account, SearchBox, styles} from 'styles/HeaderStyle'
import { IoSearch, IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";


// const categorys = [
//     { name: '홈', path: '/' },
//     { name: '영화', path: '/media/1' },
//     { name: '시리즈', path: '/media/2' },
//     { name: '넷플릭스 오리지널', path: '/netflix-original' }
// ]


function Header () {
    const [openSearchInput, setOpenSearchInput] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')

    const homeMatch = useMatch('/')
    const movieMatch = useMatch('/media/1')
    const seriesMatch = useMatch('/media/2')
    const netflixMatch = useMatch('/netflix-original')
    const categorys = [
        { name: '홈', path: '/', active: Boolean(homeMatch) },
        { name: '영화', path: '/media/1', active: Boolean(movieMatch) },
        { name: '시리즈', path: '/media/2', active: Boolean(seriesMatch) },
        { name: '넷플릭스 오리지널', path: '/netflix-original', active: Boolean(netflixMatch) }
    ]

    const navigate = useNavigate()
    const searchRef = useRef(null)

    useEffect(() => {
        // 특정 영역 외 클릭 시 이벤트 발생
    	const outSideClick = (e) => {
            console.log('outSideClick', e.target, searchRef.current)
        	if (searchRef.current && !searchRef.current.contains(e.target)) {
            	setOpenSearchInput(false)
                setSearchKeyword('')
            }
        }
        // 이벤트 리스너에 outSideClick 함수 등록
        document.addEventListener("mousedown", outSideClick)
        return (
            document.removeEventListener("mousedown", outSideClick)
        )
    }, [searchRef])

    function search (e) {
        // 추가) 검색 페이지 이동 props로 keyword 넘겨주기
        if (e.keyCode === 13 && searchKeyword.trim().length !== 0) {
            navigate("/search", { state: {keyword: searchKeyword} })
        }
    }
    return (
        <Wrapper id="header">
            <Container>
                {/* 좌측 넷플릭스 로고 */}
                <Link to="/"><img loading="lazy" src={logo} style={{width: 120, verticalAlign:'middle'}} alt="logo"/></Link>
                
                {/* 좌측 카테고리 */}
                <Nav>
                    {categorys.map((el, i) => {
                        return (
                            <NavItem key={i}>
                                <Link to={el.path}>
                                    <div>
                                        <CategoryText selected={!!el.active}>{el.name}</CategoryText>
                                    </div>
                                </Link>
                            </NavItem>
                    )})}
                </Nav>

                {/* 우측 검색 아이콘 */}
                <div style={styles.rightItems}>
                    <SearchBox ref={searchRef} open={openSearchInput}>
                        <label htmlFor="searchInput" style={{height: 'inherit'}}><IoSearch onClick={(e) => openSearchInput ? search(e) : setOpenSearchInput(true)} style={styles.searchIcon}/></label>
                            {
                                openSearchInput &&
                                    <>
                                        <input type="text" id="searchInput" placeholder="제목, 인물" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} onKeyDown={(e) => search(e)} />
                                        <label htmlFor="searchInput" style={{height: 'inherit'}}><IoCloseSharp onClick={() => setSearchKeyword('')} style={styles.searchIcon}/></label>
                                    </>
                            }
                    </SearchBox>
                    {/* <Link to="/"><Account>로그인</Account></Link> */}
                </div>
            </Container>
        </Wrapper>
    )
}

export default Header