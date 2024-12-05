import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PreviewModal from './modal/PreviewModal'
import { getContentImg } from 'utils/CommonFunction'

const Wrapper = styled.ul`
    list-style: none;
    padding: 5px;
`
const Profile = styled.li`
     width: 100%;
    height: 280px;
    background-image: url(${props => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    cursor: pointer;

    & > .fadeIn {
        opacity: 0;
        transition: 0.5s;
    }
    &:hover + .fadeIn {
        opacity: 1;
    }
`

function SearchPerson (props) {
    const {id, ...detail} = props
    // console.log('SearchPerson > props', id, detail);
    const [modalActive, setModalActive] = useState(false)
    const profileRef = useRef(null)

    return (
        <Wrapper id="person-list">
            <Profile ref={profileRef} url={getContentImg(detail.profile)} onMouseEnter={() => setModalActive(true)} onMouseLeave={() => setModalActive(false)}>
                {/* <div className="fadeIn">
                    {modalActive && <PreviewModal id={id} detail={detail} /> }
                </div> */}
            </Profile>
            <div>{detail.name}</div>
        </Wrapper>
    )
}

export default SearchPerson