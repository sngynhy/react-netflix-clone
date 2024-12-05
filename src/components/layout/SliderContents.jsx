import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PreviewModal from './modal/PreviewModal'

const Wrapper = styled.div`
    display: flex;
    // list-style: none;
    // padding: 0;
    // overflow-y: visible;
    // scrollbar-width: none;
    // scroll-snap-type: x mandatory;
    // scroll-margin-inline-start: 2.5rem;
`
const Poster = styled.div`
    flex-shrink: 0;
    scroll-snap-align: start;
    display: flex;
    & > img {
        cursor: pointer;
        width: 215px;
    }
    & > .fadeIn {
        opacity: 0;
        transition: 0.5s;
    }
    & > img:hover + .fadeIn {
        opacity: 1;
    }
`

function SliderContents (props) {
    const {id, ...detail} = props
    // console.log('Movie > props', props);
    const [openPreviewmodal, setOpenPreviewmodal] = useState(false)
    const posterRef = useRef(null)
    const POSTER_URL = `https://image.tmdb.org/t/p/original` + detail.poster
    
    return (
        // <div style={{border: 'none'}}>
        //     <div style={{marginRight: '8px'}}>
        //         <img loading="lazy" src={POSTER_URL} alt="포스터" style={{width: '200px'}} />
        //     </div>
        // </div>

        <Wrapper>
            <Poster ref={posterRef} onMouseEnter={() => setOpenPreviewmodal(true)} onMouseLeave={() => setOpenPreviewmodal(false)}>
            {/* <Poster ref={posterRef}> */}
                <img loading="lazy" src={POSTER_URL} alt="포스터" />
                {/* <div className="fadeIn"> */}
                    {/* {openPreviewmodal && <PreviewModal id={id} detail={detail} /> } */}
                    {/* <PreviewModal id={id} detail={detail} /> */}
                {/* </div> */}
                {/* {modalActive && <PreviewModal id={id} detail={detail} left={0} top={0} />} */}

                {/* {<Link to={`/movie-detail/${id}`}><img src={POSTER_URL + poster} /></Link>} */}
                {/* <h2><Link to='/movie-detail' state={{ title, overview, poster, genres }}>{title} ({originTitle})</Link></h2> */}
            </Poster>
        </Wrapper>
    )
}


// SliderContents.prototype = {
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
// SliderContents.defaultProps = {
//     voteAvg: 0,
//     voteCnt: 0,
// }
export default SliderContents