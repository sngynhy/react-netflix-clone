import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <GoChevronRight
            className={className}
            style={{ ...style, display: "block", color: "white", width: '50px', height: '50px', right: '-50px' }} // , width: '60px', height: '60px'
            onClick={onClick}
        />
    )
}
  
export const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <GoChevronLeft
            className={className}
            style={{ ...style, display: "block", color: "white", width: '50px', height: '50px', left: '-50px' }}
            onClick={onClick}
        />
    )
}