import React from "react";
import { useSearchParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { fetchSearchBykeyword } from "api/movieApi";
import styled from "styled-components";
import { RxTriangleRight } from "react-icons/rx";
import GridContents from "components/contents/GridContents";

function Search (props) {
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    console.log('keyword', keyword);
    
    const {data: movieData, isLoading: movieIsLoading, error: movieError } = useQuery({
        queryKey: ["search", 'movie', keyword],
        queryFn: fetchSearchBykeyword,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
    const {data: tvData, isLoading: tvIsLoading, error: tvError } = useQuery({
        queryKey: ["search", 'tv', keyword],
        queryFn: fetchSearchBykeyword,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
    const {data: personData, isLoading: personIsLoading, error: personError } = useQuery({
        queryKey: ["search", 'person', keyword],
        queryFn: fetchSearchBykeyword,
        select: data => data.filter(el => el.profile_path !== null && el.poster !== null)
    })

    if (!keyword) return (
        <Container>
            <Wrapper>
                <h2 style={{textAlign: 'center'}}><span>검색 키워드를 입력하세요.</span></h2>
            </Wrapper>
        </Container>
    )
    if (movieIsLoading || tvIsLoading || personIsLoading) return
    if (movieError || tvError || personError) return <p>Error occurred!</p>
    
    return (
        <Container>
            <Wrapper>
                <h2 style={{textAlign: 'center'}}><span>'{keyword}'</span> 검색 결과입니다.</h2>
                
                <div style={{padding: '0 40px'}}>
                    {/* 영화 */}
                    <h2><RxTriangleRight />
                        <div style={{display: 'inline-block', marginLeft: '5px'}}>
                            영화{movieData.length !== 0 && <span style={{marginLeft: '8px', borderBottom: '1px solid #b3b3b3', color: '#b3b3b3', fontSize: '18px', cursor: 'pointer'}}>모두 보기</span>}
                        </div>
                    </h2>
                    <div>
                        {movieData.length !== 0
                            ? <GridContents data={movieData} mType='movie' showTitle={true} showOverview={false} gridColumns={6} />
                            : <span>검색 결과가 없습니다.</span>}
                    </div>
                
                    {/* TV */}
                    <h2><RxTriangleRight />
                        <div style={{display: 'inline-block', marginLeft: '5px'}}>
                            TV{tvData.length !== 0 && <span style={{marginLeft: '8px', borderBottom: '1px solid #b3b3b3', color: '#b3b3b3', fontSize: '18px', cursor: 'pointer'}}>모두 보기</span>}
                        </div>
                    </h2>
                    <div>
                        {tvData.length !== 0
                            ? <GridContents data={tvData} mType='tv' showTitle={true} showOverview={false} gridColumns={6} />
                            : <span>검색 결과가 없습니다.</span>}
                    </div>

                    {/* 인물 */}
                    <h2><RxTriangleRight /> 인물</h2>
                    <div>
                        {personData.length !== 0
                            ? <GridContents data={personData} mType='person' showTitle={false} showOverview={false} gridColumns={7} imgPath='profile_path' />
                            : <span>검색 결과가 없습니다.</span>}
                    </div>
                </div>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    padding-top: 80px;
    & h2, > div > h2 {
        font-weight: 400;
    }
    & > div > h2 > svg {
        color: red;
    }
`

export default React.memo(Search)