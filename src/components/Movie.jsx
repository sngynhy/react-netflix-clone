import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Movie ({id, coverImg, title, summary, genres}) {
    return (
        <div>
            {coverImg && <Link to={`/movie/${id}`}><img src={coverImg} style={{cursor: 'pointer'}} /></Link>}
            <h2><Link to={`/movie/${id}`}>{title}</Link></h2>
            <p>{summary}</p>
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