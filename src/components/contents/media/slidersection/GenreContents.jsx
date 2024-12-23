import { useConetentsByGenreQuery } from "hooks/useReactQuery";
import React, { useEffect, useMemo } from "react";
import { useMediaStore } from "stores/mediaStore";
import { SliderContainer } from 'components/ui/SliderContainer';

export const GenreContents = React.memo(({mType, genreId, sendCoverDat}) => {
    const {genreName} = useMediaStore()
    const {data, isLoading, error} = useConetentsByGenreQuery({ type: mType, genreId: genreId })
    
    useEffect(() => {
        if (!isLoading) sendCoverDat(data[Math.floor(Math.random() * 10)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    if (isLoading) return
    if (error) return <p>Error occurred!</p>

    return (
        <>
        {data &&
            <div style={{paddingTop: '650px'}}>
                <div>
                    <SliderContainer mType={mType} headerTitle={genreName + ' 콘텐츠'} data={data} />
                </div>
            </div>}
        </>
    )
})