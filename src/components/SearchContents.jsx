import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PreviewModal from './modal/PreviewModal'
import { getContentImg } from 'utils/CommonFunction'

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

    return (
        <Wrapper id="movie-list">
            <Poster ref={posterRef} onMouseEnter={() => setModalActive(true)} onMouseLeave={() => setModalActive(false)}>
                <img loading="lazy" src={getContentImg(detail.poster)} alt={detail.title} width='100%'/>
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
export default SearchContents