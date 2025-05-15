import { useQueries } from "@tanstack/react-query";
import { fetchContentDetails } from "api/mediaApi";
import GridContents from "components/ui/layout/GridContents";
import React from "react";
import { Helmet } from "react-helmet";
import { useMediaStore } from "stores/mediaStore"
import { useResponsive } from "hooks/useResponsive";
import { gridColumns } from "utils/mediaSize";
import { Container, H1 } from "./TrendingNow";

function MyContents () {

    const { device } = useResponsive()

    const {likes} = useMediaStore() // likes: { id => mType }
    const likeList = Array.from(likes)
    // const ids = Array.from(likes.keys())
    // ids.map(id => console.log(id, likes.get(id)))

    // const logoData = logoQueries?.map(query => query.data).map(datas => {
    //     // 한국어 > 영어 기준으로 정렬하여 한국어 로고를 추출, 만약 한국어 로고가 없다면 영어 로고 추출
    //     return {id: datas.id, path: datas.data.sort((a, b) => b.iso_639_1.localeCompare(a.iso_639_1)).find(el => el.iso_639_1 === 'ko' || el.iso_639_1 === 'en').file_path}
    // })

    // Parallel Queries를 활용한 Fetching > 여러 ID에 대해 병렬로 동시에 데이터를 불러옴 => 각 ID의 데이터를 독립적으로 캐싱
    const queries = useQueries({
        queries: likeList?.map(el => ({
            queryKey: ['myContents', el[1], el[0]],
            queryFn: fetchContentDetails,
            select: data => ({...data, media_type: el[1]})
          })),
    })

    if (queries.some((query) => query.isLoading || query.isError)) return <></>

    const data = queries.map(query => query.data)
    // console.log('MyContents > data', data);
    return (
        <div className="my-contents">
            <Helmet>
                <title>넷플릭스</title>
            </Helmet>

            <Container>
                <div className="title">
                    <H1 style={{fontWeight: '400'}}>내가 찜한 리스트</H1>
                </div>
                {likes.size > 0 && data.length > 0 ?
                <div className="contents" style={{marginTop: "5rem"}}>
                    <GridContents data={data} mType={null} showTitle={true} showOverview={false} gridColumns={gridColumns[device]} />
                </div>
                : <div style={{color: '#666', textAlign: 'center', fontSize: '20px', paddingTop: '100px'}}>아직 찜하신 콘텐츠가 없습니다.</div>}
            </Container>
        </div>
    )
}

export default MyContents