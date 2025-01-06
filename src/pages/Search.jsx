import React from "react";
import { useLocation, useSearchParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { fetchSearchBykeyword } from "api/movieApi";
import styled from "styled-components";
import { RxTriangleRight } from "react-icons/rx";
import GridContents from "components/contents/GridContents";

const Wrapper = styled.div`
    width: 100%;
`
const Container = styled.div`
    width: 100%;
    padding-top: 80px;
    & h2, > div > h2 {
        font-weight: 400;
    }
    & > div > h2 > svg {
        color: red;
    }
`
function Search (props) {
    // const { state } = useLocation()
    // const keyword = state.keyword
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    
    const {data: movieResult, isLoading: movieIsLoading, error: movieError } = useQuery({
        queryKey: ["search", 'movie', keyword],
        queryFn: fetchSearchBykeyword,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
    const {data: tvResult, isLoading: tvIsLoading, error: tvError } = useQuery({
        queryKey: ["search", 'tv', keyword],
        queryFn: fetchSearchBykeyword,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
    const {data: personResult, isLoading: personIsLoading, error: personError } = useQuery({
        queryKey: ["search", 'person', keyword],
        queryFn: fetchSearchBykeyword,
        select: data => data.filter(el => el.profile_path !== null && el.poster !== null)
    })

    if (movieIsLoading || tvIsLoading || personIsLoading) return
    if (movieError || tvError || personError) return <p>Error occurred!</p>
    
    return (
        <Wrapper>
            <Container>
                <h2 style={{textAlign: 'center'}}><span style={{}}>'{keyword}'</span> 검색 결과입니다.</h2>
                
                <div style={{padding: '0 40px'}}>
                    {/* 영화 */}
                    <h2><RxTriangleRight />
                        <div style={{display: 'inline-block', marginLeft: '5px'}}>
                            영화{movieResult.length !== 0 && <span style={{marginLeft: '8px', borderBottom: '1px solid #b3b3b3', color: '#b3b3b3', fontSize: '18px', cursor: 'pointer'}}>모두 보기</span>}
                        </div>
                    </h2>
                    <div>
                        {movieResult.length !== 0
                            ? <GridContents data={movieResult} mType='movie' showTitle={true} showOverview={false} gridColumns={6} imgPath="backdrop_path" />
                            : <span>검색 결과가 없습니다.</span>}
                    </div>
                
                    {/* TV */}
                    <h2><RxTriangleRight />
                        <div style={{display: 'inline-block', marginLeft: '5px'}}>
                            TV{tvResult.length !== 0 && <span style={{marginLeft: '8px', borderBottom: '1px solid #b3b3b3', color: '#b3b3b3', fontSize: '18px', cursor: 'pointer'}}>모두 보기</span>}
                        </div>
                    </h2>
                    <div>
                        {tvResult.length !== 0
                            ? <GridContents data={tvResult} mType='tv' showTitle={true} showOverview={false} gridColumns={6} imgPath="backdrop_path" />
                            : <span>검색 결과가 없습니다.</span>}
                    </div>

                    {/* 인물 */}
                    <h2><RxTriangleRight /> 인물</h2>
                    <div>
                        {personResult.length !== 0
                            ? <GridContents data={personResult} mType='person' showTitle={false} showOverview={false} gridColumns={7} imgPath='profile_path' />
                            : <span>검색 결과가 없습니다.</span>}
                    </div>
                </div>
            </Container>
        </Wrapper>
    )
}

export default Search