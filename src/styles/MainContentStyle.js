import styled from "styled-components";

export const MainCoverImg = styled.div`
    background-image: url(${props => props.$url});
    background-size: cover;
    height: 800px;
    width: 100%;
    margin-bottom: 0px;
    mask-image: linear-gradient(180deg, #181818, transparent 90%); // linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4));
    mask-size: 100% 120%;
    mask-repeat: no-repeat;
    position: absolute;
    z-index: 0;
`
export const Container = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 600px;
    margin-top: 64px;
`
export const SelectBox = styled.div`
    width: calc(100% - 120px);
    padding: 0 60px;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: flex-start;
    position: absolute;
    z-index: 2;
    background-color: ${props => !props.$scrollTop && !props.$openDetailModal ? 'black;' : 'transparent;'}
    position: fixed;
    transition: 0.5s;
    
    & > span {
        font-size: 38px;
        margin-right: 15px;
    }
    & > .selectBox {
        border: 1px solid white;
        width: auto; // 95px;
        margin: 0 30px;
        cursor: pointer;
        display: inline-block;
        position: relative;
        background-color: ${props => props.$openGenreBox ? 'hsla(0,0%,100%,.1);' : 'black;'};
    }
    & > .selectBox:hover {
        background-color: hsla(0,0%,100%,.1);
    }
    & > .selectBox > .selectIndex {
        padding: 5px 10px;
    }
    & > .selectBox > .selectBoxOptions {
        position: absolute;
        z-index: 3;
        top: 32px;
        background-color: rgba(0,0,0,.9);
        width: 500px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
    & > .selectBox > .selectBoxOptions > div > span:hover {
        border-bottom: 2px solid white;
    }
`
export const CoverContentText = styled.div`
    padding: 0 60px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: flex-start;
    position: absolute;
    bottom: 10%;

    & > h2 {
        font-size: 50px;
        margin: 8px 15px 0 0;
    }
    & > p {
        width: 40%;
        font-size: 20px;
        margin: 0 15px 0 0;
    }
`

export const DetailViewButton = styled.button`
    padding: 0.6rem 1.6rem;
    font-size: 20px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    color: white;
    background-color: rgba(109, 109, 110, 0.7);
    & > svg {
        margin-right: 8px;
    }
    &:hover {
        color: white;
        background-color: rgba(109, 109, 110, 0.4);
    }
`