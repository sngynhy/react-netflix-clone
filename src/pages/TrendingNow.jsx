import React, { useEffect } from "react";
import GridContents from "components/ui/layout/GridContents";
import { useTrendingContentsQueries } from "hooks/useReactQuery";
import { Helmet } from "react-helmet";

function TrendingNow () {
    
    const queries = useTrendingContentsQueries()
    
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

            <div style={{padding: '64px 60px 0'}}>
                <div>
                    <div className="title">
                        <h1 style={{fontWeight: '400'}}>오늘의 인기 콘텐츠</h1>
                    </div>
                    {weekContents?.map((el, i) => {
                        return (<div key={i} className="contents" style={{marginTop: "1rem"}}>
                            <GridContents data={el.data} mType={null} showTitle={true} showOverview={false} gridColumns={6} />
                        </div>)
                    })}
                </div>

                <br/><br/>
                
                <div>
                    <div className="title">
                        <h1 style={{fontWeight: '400'}}>이번주 인기 콘텐츠</h1>
                    </div>
                    {dayContents?.map((el, i) => {
                        return (<div key={i} className="contents" style={{marginTop: "1rem"}}>
                            <GridContents data={el.data} mType={null} showTitle={true} showOverview={false} gridColumns={6} />
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default TrendingNow