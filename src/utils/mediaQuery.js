import { css } from "styled-components";

export const breakpoints = {
    small: '@media (max-width: 767px)',
    medium: '@media (max-width: 1024px)',
    large: '@media (min-width: 1025px)'
}

export const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: (first, ...interpolations) => {
            return css`
            ${value} {
                ${css(first, ...interpolations)}
            }`
        }
    }
}, {})