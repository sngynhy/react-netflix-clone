import React from "react";
import { useLocation } from 'react-router-dom'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSearchBykeyword } from "api/movieApi";
import SearchContents from "../components/layout/SearchContents";
import SearchPerson from "../components/layout/SearchPerson";
import styled from "styled-components";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { RxTriangleRight } from "react-icons/rx";

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
    const { state } = useLocation()
    const keyword = state.keyword

    const {data: movieResult, isLoading: movieIsLoading, error: movieError } = useQuery({
        queryKey: ["search", 'movie', keyword],
        queryFn: fetchSearchBykeyword,
        // select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
    const {data: tvResult, isLoading: tvIsLoading, error: tvError } = useQuery({
        queryKey: ["search", 'tv', keyword],
        queryFn: fetchSearchBykeyword,
        // select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
    const {data: personResult, isLoading: personIsLoading, error: personError } = useQuery({
        queryKey: ["search", 'person', keyword],
        queryFn: fetchSearchBykeyword,
        // select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })

    if (movieIsLoading || tvIsLoading || personIsLoading) return <LoadingOverlay />;
    if (movieError || tvError || personError) return <p>Error occurred!</p>;
    
    return (
        <Wrapper>
            <Container>
                <h2 style={{textAlign: 'center'}}><span style={{}}>'{keyword}'</span> 검색 결과입니다.</h2>
                
                <div style={{padding: '0 40px'}}>
                    <h2><RxTriangleRight /><div style={{display: 'inline-block'}}>영화</div>
                        {/* <div style={{display: 'inline-block', marginLeft: '5px'}}>
                            영화<span style={{marginLeft: '8px', borderBottom: '1px solid #b3b3b3', color: '#b3b3b3', fontSize: '18px', cursor: 'pointer'}}>모두 보기</span>
                        </div> */}
                    </h2>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)'}}>
                        {movieResult.length !== 0 ? movieResult.map(el => {
                                if (el.poster_path) return <SearchContents
                                                            key={el.id}
                                                            id={el.id}
                                                            title={el.title}
                                                            originTitle={el.original_title}
                                                            overview={el.overview}
                                                            poster={el.poster_path}
                                                            backdrop={el.backdrop_path}
                                                            genre={el.genre_ids}
                                                            voteAvg={el.vote_average.toFixed(1)}
                                                            voteCnt={el.vote_count} />
                                })
                            : <spna>검색 결과가 없습니다.</spna>}
                            
                    </div>

                    <h2><RxTriangleRight /><div style={{display: 'inline-block'}}>TV</div></h2>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)'}}>
                        {tvResult.length !== 0 ? tvResult.map(el => {
                                if (el.poster_path) return <SearchContents
                                                            key={el.id}
                                                            id={el.id}
                                                            title={el.name}
                                                            originTitle={el.original_name}
                                                            overview={el.overview}
                                                            poster={el.poster_path}
                                                            backdrop={el.backdrop_path}
                                                            genre={el.genre_ids}
                                                            voteAvg={el.vote_average.toFixed(1)}
                                                            voteCnt={el.vote_count} />
                            })
                            : <spna>검색 결과가 없습니다.</spna>}
                    </div>

                    <h2><RxTriangleRight /> 인물</h2>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'}}>
                        {personResult.length !== 0 ? personResult.map(el => {
                                if (el.profile_path) return <SearchPerson
                                                            key={el.id}
                                                            id={el.id}
                                                            name={el.name}
                                                            originName={el.original_name}
                                                            gender={el.gender}
                                                            department={el.known_for_department}
                                                            profile={el.profile_path}
                                                            work={el.known_for}
                                                             />
                            })
                            : <spna>검색 결과가 없습니다.</spna>}
                    </div>
                </div>
            </Container>
        </Wrapper>
    )
}

export default Search