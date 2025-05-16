import React from "react";
import { useSearchParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { fetchSearchBykeyword } from "api/mediaApi";
import styled from "styled-components";
import { RxTriangleRight } from "react-icons/rx";
import GridContents from "components/ui/layout/GridContents";
import { Helmet } from "react-helmet";
import { useResponsive } from "hooks/useResponsive";
import { gridColumns } from "utils/mediaSize";
import { media } from "utils/mediaQuery";

function Search () {

    const { device } = useResponsive()

    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    
    const {data: movieData, isLoading: movieIsLoading, error: movieError } = useQuery({
        queryKey: ["search", 'movie', keyword],
        queryFn: fetchSearchBykeyword,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null),
        enabled: !!keyword
    })
    const {data: tvData, isLoading: tvIsLoading, error: tvError } = useQuery({
        queryKey: ["search", 'tv', keyword],
        queryFn: fetchSearchBykeyword,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null),
        enabled: !!keyword
    })
    const {data: personData, isLoading: personIsLoading, error: personError } = useQuery({
        queryKey: ["search", 'person', keyword],
        queryFn: fetchSearchBykeyword,
        select: data => data.filter(el => el.profile_path !== null && el.poster !== null),
        enabled: !!keyword
    })

    if (!keyword) return (
        <Container>
            <Helmet>
                <title>넷플릭스</title>
            </Helmet>
            <Wrap>
                <h2 style={{textAlign: 'center'}}><span>검색 키워드를 입력하세요.</span></h2>
            </Wrap>
        </Container>
    )
    if (movieIsLoading || tvIsLoading || personIsLoading || movieError || tvError || personError) return <></>
    
    return (
        <Container>
            <Helmet>
                <title>넷플릭스</title>
            </Helmet>

            <Wrap>
                <h2><span>'{keyword}'</span> 검색 결과입니다.</h2>
                
                <div className="search-contents">
                    {/* 영화 */}
                    <h2><RxTriangleRight />
                        <div style={{display: 'inline-block', marginLeft: '5px'}}>
                            영화
                            {/* {movieData.length !== 0 && <span style={{marginLeft: '8px', borderBottom: '1px solid #b3b3b3', color: '#b3b3b3', fontSize: '18px', cursor: 'pointer'}}>모두 보기</span>} */}
                        </div>
                    </h2>
                    <div>
                        {movieData.length !== 0
                            ? <GridContents data={movieData} mType='movie' showTitle={true} showOverview={false} gridColumns={gridColumns[device]} />
                            : <span>검색 결과가 없습니다.</span>}
                    </div>
                
                    {/* TV */}
                    <h2><RxTriangleRight />
                        <div style={{display: 'inline-block', marginLeft: '5px'}}>
                            TV
                            {/* {tvData.length !== 0 && <span style={{marginLeft: '8px', borderBottom: '1px solid #b3b3b3', color: '#b3b3b3', fontSize: '18px', cursor: 'pointer'}}>모두 보기</span>} */}
                        </div>
                    </h2>
                    <div>
                        {tvData.length !== 0
                            ? <GridContents data={tvData} mType='tv' showTitle={true} showOverview={false} gridColumns={gridColumns[device]} />
                            : <span>검색 결과가 없습니다.</span>}
                    </div>

                    {/* 인물 */}
                    <h2><RxTriangleRight /> 인물</h2>
                    <div>
                        {personData.length !== 0
                            ? <GridContents data={personData} mType='person' showTitle={false} showOverview={false} gridColumns={gridColumns[device]+1} imgPath='profile_path' />
                            : <span>검색 결과가 없습니다.</span>}
                    </div>
                </div>
            </Wrap>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
`
const Wrap = styled.div`
    width: 100%;
    ${media.large`
        padding-top: 80px;

        & > h2 {
            font-weight: 400;
            text-align: center;
        }
        & > .search-contents {
            padding: 0 60px;
            
            & > h2 {
                font-weight: 300;
            }
        }
    `}
    ${media.medium`
        padding-top: 80px;

        & > h2 {
            font-weight: 400;
            text-align: center;
        }
        & > .search-contents {
            padding: 0 40px;

            & > h2 {
                font-weight: 300;
            }
        }
    `}
    ${media.small`
        padding-top: 50px;

        & > h2 {
            font-weight: 300;
            text-align: center;
        }
        & > .search-contents {
            padding: 0 20px;

            & > h2 {
                font-weight: 300;
            }
        }
    `}

    & > div > h2 > svg {
        color: red;
    }
`

export default Search