import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FocusModal from './modal/FocusModal'
import alternativePoster from 'assets/img/alternative_poster.png'

const Wrapper = styled.ul`
    display: flex;
    list-style: none;
    padding: 5px;
    // overflow-y: visible;
    // overflow-x: scroll;
    // scrollbar-width: none;
    // scroll-snap-type: x mandatory;
    // scroll-margin-inline-start: 2.5rem;
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
    const POSTER_URL = detail.poster ? `https://image.tmdb.org/t/p/original/` + detail.poster : alternativePoster

    return (
        <Wrapper id="movie-list">
            <Poster ref={posterRef} onMouseEnter={() => setModalActive(true)} onMouseLeave={() => setModalActive(false)}>
                <img loading="lazy" src={POSTER_URL} alt="포스터" width='100%'/>
                {/* <div className="fadeIn">
                    {modalActive && <FocusModal id={id} detail={detail} /> }
                </div> */}
            </Poster>
        </Wrapper>
    )
}

// Movie.prototype = {
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     originTitle: PropTypes.string.isRequired,
//     overview: PropTypes.string,
//     poster: PropTypes.string.isRequired,
//     genre: PropTypes.arrayOf(PropTypes.number).isRequired,
//     voteAvg: PropTypes.number,
//     voteCnt: PropTypes.number,
// }

// 기본값 지정
// Movie.defaultProps = {
//     voteAvg: 0,
//     voteCnt: 0,
// }
export default SearchContents