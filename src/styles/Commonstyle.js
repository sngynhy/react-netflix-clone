import styled from "styled-components";
import { media } from "../utils/mediaQuery";
import { videoHeight } from "utils/mediaSize";

// props = {borderSize, iconSize}
const defaultValue = {
    borderSize: 45,// 45,
    iconSize: 25, // 25,
    top: 10, // 10,
    left: 10// 10
}
// 아이콘 버튼
export const Border = styled.div`
    position: relative;
    width: ${props => props.$borderSize || defaultValue.borderSize}px;
    height: ${props => props.$borderSize || defaultValue.borderSize}px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.7);
    cursor: pointer;
    &:hover {
        background-color: rgba(109, 109, 110, 0.4);
    }
    & > svg {
        width: ${props => props.$iconSize || defaultValue.iconSize}px;
        height: ${props => props.$iconSize || defaultValue.iconSize}px;
        position: absolute;
        top: ${props => (props.$borderSize - props.$iconSize) / 2 || defaultValue.top}px;
        left: ${props => (props.$borderSize - props.$iconSize) / 2 || defaultValue.left}px;
    }
`

export const Container = styled.div`
    ${media.large`
        padding-top: ${videoHeight.lg - 180}px;
    `}
    ${media.medium`
        padding-top: ${videoHeight.md - 120}px;
    `}
    ${media.small`
        padding-top: ${videoHeight.sm - 40}px;
    `}
`