import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const POSTER_URL = `https://image.tmdb.org/t/p/original/`

const MovieList = styled.ul`
    display: flex;
    list-style: none;
    position: relative;
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
    margin: 0 5px;
`

function Movie ({id, title, originTitle, overview, poster, genres, voteAvg = 0, voteCnt = 0}) {
    return (
        <MovieList>
            <Poster>
                {<img src={POSTER_URL + poster} style={{cursor: 'pointer', width: '200px'}} />}
                {/* {<Link to={`/movie-detail/${id}`}><img src={POSTER_URL + poster} style={{cursor: 'pointer', width: '200px'}} /></Link>} */}
                {/* <h2><Link to='/movie-detail' state={{ title, overview, poster, genres }}>{title} ({originTitle})</Link></h2> */}
            </Poster>
        </MovieList>
    )
}

Movie.prototype = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    originTitle: PropTypes.string.isRequired,
    overview: PropTypes.string,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.arrayOf(PropTypes.number).isRequired,
    voteAvg: PropTypes.number,
    voteCnt: PropTypes.number,
}

// 기본값 지정
// Movie.defaultProps = {
//     voteAvg: 0,
//     voteCnt: 0,
// }
export default Movie