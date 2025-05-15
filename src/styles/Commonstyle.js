import styled from "styled-components";
import { media } from "../utils/mediaQuery";
import { videoHeight } from "utils/mediaSize";

export const Container = styled.div`
    ${media.large`
        padding-top: ${videoHeight.lg - 180}px;
    `}
    ${media.medium`
        padding-top: ${videoHeight.md - 100}px;
    `}
    ${media.small`
        padding-top: ${videoHeight.sm - 30}px;
    `}
`