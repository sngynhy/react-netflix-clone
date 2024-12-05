import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PreviewModal from './modal/PreviewModal'

const Wrapper = styled.ul`
    display: flex;
    list-style: none;
    padding: 5px;
`
const Poster = styled.li`
    display: flex;
    & > img {
        cursor: pointer;
        width: ${props => props.width}%;
    }
    & > .fadeIn {
        opacity: 0;
        transition: 0.5s;
    }
    & > img:hover + .fadeIn {
        opacity: 1;
    }
`

function SearchContents (props) {
    const {id, ...detail} = props
    // console.log('MovieList > props', id, detail);
    const [modalActive, setModalActive] = useState(false)
    const posterRef = useRef(null)
    const POSTER_URL = `https://image.tmdb.org/t/p/original/` + detail.poster // detail.backdrop

    return (
        <Wrapper id="movie-list">
            <Poster ref={posterRef} onMouseEnter={() => setModalActive(true)} onMouseLeave={() => setModalActive(false)}>
                <img loading="lazy" src={POSTER_URL} alt="포스터" width='100%'/>
                {/* <div className="fadeIn">
                    {modalActive && <PreviewModal id={id} detail={detail} /> }
                </div> */}
            </Poster>
        </Wrapper>
    )
}

SearchContents.prototype = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    originTitle: PropTypes.string.isRequired,
    overview: PropTypes.string,
    poster: PropTypes.string.isRequired,
    backdrop: PropTypes.string.isRequired,
    genre: PropTypes.arrayOf(PropTypes.number).isRequired,
    voteAvg: PropTypes.number,
    voteCnt: PropTypes.number,
}

// 기본값 지정
SearchContents.defaultProps = {
    voteAvg: 0.0,
    voteCnt: 0,
}
export default SearchContents