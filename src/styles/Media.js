import { css } from "styled-components";

export const breakpoints = {
    small: '@media (max-width: 639px)',
    medium: '@media (max-width: 1047px)',
    large: '@media (min-width: 1048px)'
}

export const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: (first, ...interpolations) => {
            console.log('first', first);
            console.log('interpolations', interpolations);
            return css`
            ${value} {
                ${css(first, ...interpolations)}
            }`
        }
    }
}, {})