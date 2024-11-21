import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Movie ({id, poster, title, summary, genres}) {
    return (
        <div>
            {poster && <Link to={`/movie-detail/${id}`}><img src={poster} style={{cursor: 'pointer'}} /></Link>}
            {/* <h2><Link to={`/movie/${id}`}>{title}</Link></h2> */}
            <h2><Link to='/movie-detail' state={{ title, summary, poster, genres }}>{title}</Link></h2>
            <p>{summary.lenght > 100 ? `${summary.slice(0, 100)}...` : summary}</p>
            {genres && <ul>{genres.map(g => <li key={g}>{g}</li>)}</ul>}
        </div>
    )
}

Movie.prototype = {
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
}
export default Movie