import React, { useEffect } from "react";
import GridContents from "components/ui/layout/GridContents";
import { useTrendingContentsQueries } from "hooks/useReactQuery";
import { Helmet } from "react-helmet";
import { useResponsive } from "hooks/useResponsive";
import { gridColumns } from "utils/mediaSize";
import styled from "styled-components";
import { media } from "../utils/mediaQuery";

function TrendingNow () {
    
    const queries = useTrendingContentsQueries()
    const { device } = useResponsive()
    
    if (queries.some((query) => query.isLoading || query.isError)) return <></>

    const data = queries?.map(query => query.data)
    const weekContents = data?.filter(el => el.period === 'week')
    const dayContents = data?.filter(el => el.period === 'day')
    // console.log('weekContents', weekContents);
    // console.log('dayContents', dayContents);
    
    return (
        <div className="trending-now">
            <Helmet>
                <title>넷플릭스</title>
            </Helmet>

            <Container>
                <div>
                    <H1>오늘의 인기 콘텐츠</H1>
                    {weekContents?.map((el, i) => {
                        return (<div key={i} className="contents" style={{marginTop: "1rem"}}>
                            <GridContents data={el.data} mType={null} showTitle={true} showOverview={false} gridColumns={gridColumns[device]} />
                        </div>)
                    })}
                </div>
                <br />
                <div>
                    <H1>이번주 인기 콘텐츠</H1>
                    {dayContents?.map((el, i) => {
                        return (<div key={i} className="contents" style={{marginTop: "1rem"}}>
                            <GridContents data={el.data} mType={null} showTitle={true} showOverview={false} gridColumns={gridColumns[device]} />
                        </div>)
                    })}
                </div>
            </Container>
        </div>
    )
}

export const Container = styled.div`
    ${media.large`
        padding: 64px 60px 0;
        & > div {
            margin: 1rem 0;
        }
    `}
    ${media.medium`
        padding: 64px 40px 0;
        & > div {
            margin: 1.5rem 0;
        }
    `}
    ${media.small`
        padding: 32px 20px 0;
        & > div {
            margin: 2rem 0;
        }
    `}
`
export const H1 = styled.h1`
    ${media.large`
        font-weight: 400;
        font-size: 2rem;
    `}
    ${media.medium`
        font-weight: 300;
        font-size: 1.5rem;
    `}
    ${media.small`
        font-weight: 300;
        font-size: 1.2rem;
    `}
`
export default TrendingNow