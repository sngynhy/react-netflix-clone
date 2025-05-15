import { useConetentsByGenreQuery } from "hooks/useReactQuery";
import React, { useEffect } from "react";
import { useMediaStore } from "stores/mediaStore";
import { SliderContainer } from 'components/ui/slider/SliderContainer';
import { Container } from "styles/Commonstyle";

export const GenreContents = React.memo(({mType, genreId, sendCoverDat}) => {
    const {genreName} = useMediaStore()
    const {data, isLoading, error} = useConetentsByGenreQuery({ type: mType, genreId: genreId })
    useEffect(() => {
        if (!isLoading) sendCoverDat(data[Math.floor(Math.random() * 10)])
    }, [data, isLoading, sendCoverDat])

    if (isLoading || error) return <></>

    return (
        <>
        {data &&
            <Container>
                <div>
                    <SliderContainer mType={mType} headerTitle={genreName + ' 콘텐츠'} data={data} />
                </div>
            </Container>}
        </>
    )
})