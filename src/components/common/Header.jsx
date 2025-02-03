import React, { useState, useRef, useEffect, memo } from "react";
import { Link, useNavigate, useMatch } from 'react-router-dom'
import logo from 'assets/img/logo/logo.png'
import {Container, Wrapper, Nav, NavItem, CategoryText, SearchBox, styles} from 'styles/HeaderStyle'
import { IoSearch, IoCloseSharp } from "react-icons/io5";
import { useMediaStore } from "stores/mediaStore";

// memo => props가 변경되지 않은 경우 구성 요소를 다시 렌더링하는 것을 건너뜀
export const Header = memo(function Header () {
    const { isModalOpen } = useMediaStore()
    const homeMatch = useMatch('/')
    const movieMatch = useMatch('/media/movie')
    const seriesMatch = useMatch('/media/tv')
    const movieByGenreMatch = useMatch('/media/movie/genre/:genreId')
    const seriesByGenreMatch = useMatch('/media/tv/genre/:genreId')
    const TrendingNowMatch = useMatch('/trending-now')
    const MyContentsMatch = useMatch('/my-list')
    
    const categorys = [
        { name: '홈', path: '/', active: Boolean(homeMatch) },
        { name: '영화', path: '/media/movie', active: Boolean(movieMatch) || Boolean(movieByGenreMatch)},
        { name: '시리즈', path: '/media/tv', active: Boolean(seriesMatch) || Boolean(seriesByGenreMatch) },
        { name: 'NEW! 요즘 대세 콘텐츠', path: '/trending-now', active: Boolean(TrendingNowMatch) },
        { name: '내가 찜한 리스트', path: '/my-list', active: Boolean(MyContentsMatch) },
    ]

    const [scrollTop, setScrollTop] = useState(true)
    useEffect(() => {
        const handleScroll = () => setScrollTop(window.scrollY === 0)

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <Container id="header" $scrollTop={scrollTop} $isModalOpen={isModalOpen} >
            <Wrapper>
                {/* 좌측 넷플릭스 로고 */}
                <Link to="/"><img loading="lazy" src={logo} style={{width: '7rem', verticalAlign:'middle'}} alt="로고 아이콘"/></Link>
                
                {/* 좌측 카테고리 */}
                <Nav>
                    {categorys.map((el, i) => {
                        return (
                            <NavItem key={i}>
                                <Link to={el.path}>
                                    <div>
                                        <CategoryText $selected={!!el.active}>{el.name}</CategoryText>
                                    </div>
                                </Link>
                            </NavItem>
                        )
                    })}
                </Nav>

                {/* 우측 검색 아이콘 */}
                <div style={styles.rightItems}>
                    <Search />
                </div>
            </Wrapper>
        </Container>
    )
})

export const Search = () => {
    const [openSearchInput, setOpenSearchInput] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const navigate = useNavigate()
    const searchRef = useRef(null)
    useEffect(() => {
        // 특정 영역 외 클릭 시 이벤트 발생
    	const outSideClick = (e) => {
        	if (searchRef.current && !searchRef.current.contains(e.target)) { // && searchKeyword.length === 0
            	setOpenSearchInput(false)
                setSearchKeyword('')
            }
        }
        // 이벤트 리스너에 outSideClick 함수 등록
        document.addEventListener("mousedown", outSideClick)
        return () => document.removeEventListener("mousedown", outSideClick)
    }, [searchKeyword, searchRef])

    function search (e) {
        // 추가) 검색 페이지 이동 props로 keyword 넘겨주기
        if ((e.keyCode === 13 || e.type === 'click') && searchKeyword.trim().length !== 0) {
            // navigate("/search", { state: {keyword: searchKeyword} })
            navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`)
        }
    }
    return (
        <SearchBox className="search-box" ref={searchRef} $open={openSearchInput}>
            <label htmlFor="searchInput" style={{height: 'inherit'}}><IoSearch onClick={(e) => openSearchInput ? search(e) : setOpenSearchInput(true)} style={styles.searchIcon}/></label>
                {openSearchInput &&
                    <>
                        <input type="text" id="searchInput" placeholder="제목, 인물" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} onKeyDown={(e) => search(e)} />
                        <label htmlFor="searchInput" style={{height: 'inherit'}}><IoCloseSharp onClick={() => setSearchKeyword('')} style={styles.searchIcon}/></label>
                    </>}
        </SearchBox>
    )
}