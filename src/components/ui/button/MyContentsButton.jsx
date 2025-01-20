import React from 'react';
import PropTypes from 'prop-types'
import { IoAdd, IoCheckmark } from "react-icons/io5";
import { Border } from "styles/IconButtonStyle";
import { useMediaStore } from 'stores/mediaStore'

export const MyContentsButton = ({id, mType, borderSize=45, iconSize=30 }) => {
    console.log('MyContentsButton', id, typeof id);
    id = Number(id)
    const {likes, addLikes, removeLikes} = useMediaStore()
    const isLiked = likes.has(id) // 찜 상태 확인
    const setLike = () => {
        isLiked ? removeLikes(id) : addLikes(id, mType)
    }
    return (
        <Border $borderSize={borderSize} $iconSize={iconSize} onClick={setLike}>
            {isLiked ? <IoCheckmark /> : <IoAdd />}
        </Border>
    )
}

// props 유효성 검사
MyContentsButton.propTypes = {
    id: PropTypes.any.isRequired,
    mType: PropTypes.string.isRequired,
    borderSize: PropTypes.number,
    iconSize: PropTypes.number,
}

export default MyContentsButton