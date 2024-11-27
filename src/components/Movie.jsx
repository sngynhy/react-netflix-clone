import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FocusModal from './layout/modal/FocusModal'

const POSTER_URL = `https://image.tmdb.org/t/p/original/`

const MovieList = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    overflow-y: visible;
    overflow-x: scroll;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    scroll-margin-inline-start: 2.5rem;
`
const Poster = styled.li`
    flex-shrink: 0;
    scroll-snap-align: start;
    display: flex;
    margin: 0 8px;
    & > img {
        cursor: pointer;
        width: 215px;
    }
`

function Movie (props) {
    const {id, ...detail} = props
    const [modalActive, setModalActive] = useState(false)
    const posterRef = useRef(null)
    function openModal () {
        setTimeout(() => {
            setModalActive(true)
        }, 1000)
    }
    return (
        <MovieList>
            <Poster ref={posterRef} onMouseEnter={() => setModalActive(true)} onMouseLeave={() => setModalActive(false)}>
            {/* <Poster ref={posterRef} onClick={openModal} onMouseLeave={() => setModalActive(false)}> */}
                <img src={POSTER_URL + detail.poster} alt="포스터" />
                {modalActive && <FocusModal id={id} detail={detail} left={0} top={0} />}
                {/* {<Link to={`/movie-detail/${id}`}><img src={POSTER_URL + poster} /></Link>} */}
                {/* <h2><Link to='/movie-detail' state={{ title, overview, poster, genres }}>{title} ({originTitle})</Link></h2> */}
            </Poster>
        </MovieList>
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
export default Movie