import React, { useEffect } from "react";
import { useConetentsQuery, useContentsQueryKey } from "hooks/useReactQuery";
import { useMediaStore } from "stores/mediaStore";
import { SliderContainer } from "components/ui/SliderContainer";

export const MovieContents = (props) => {
    const {mType} = props
    const isMovie = mType === 'movie'
    // console.log('SliderSection', id, type);
    const {movie, tv} = useContentsQueryKey
    const {setCoverContent} = useMediaStore()
    // const {isLoading, setIsLoading} = useGlobalStore()
    // console.log('isLoading', isLoading);

    const {data: nowPlaying, isLoading: nowPlayingLoading, error: nowPlayingError} = useConetentsQuery({
        key: isMovie ? movie.nowPlaying : tv.onTheAir,
        type: mType,
        content: isMovie ? movie.nowPlaying : tv.onTheAir
    })
    const {data: popluar, isLoading: popluarLoading, error: popluarError} = useConetentsQuery({
        key: isMovie ? movie.popular : tv.popular,
        type: mType,
        content: isMovie ? movie.popular : tv.popular
    })
    const {data: topRated, isLoading: topRatedLoading, error: topRatedError} = useConetentsQuery({
        key: isMovie? movie.topRated : tv.topRated,
        type: mType,
        content: isMovie ? movie.topRated : tv.topRated
    })
    const {data: upcoming, isLoading: upcomingLoading, error: upcomingError} = useConetentsQuery({
        key: isMovie ? movie.upcoming : tv.airingToday,
        type: mType,
        content: isMovie ? movie.upcoming : tv.airingToday
    })
    useEffect(() => {
        if (!topRatedLoading) {
            setCoverContent(topRated.slice(0, 5))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topRated])

    // setIsLoading(nowPlayingLoading || upcomingLoading || popluarLoading || topRatedLoading)

    if (nowPlayingLoading || upcomingLoading || popluarLoading || topRatedLoading) return
    if (nowPlayingError || upcomingError || popluarError || topRatedError) return <p>Error occurred!</p>;

    return (
        <div style={{paddingTop: '650px'}}>
            <div>
                <SliderContainer headerTitle="왱" mType={mType} data={nowPlaying} />
            </div>

            <div>
                <SliderContainer headerTitle='' mType={mType} data={topRated} />
            </div>

            <div>
                <SliderContainer headerTitle='' mType={mType} data={popluar} />
            </div>

            <div>
                <SliderContainer headerTitle='' mType={mType} data={upcoming} />
            </div>
        </div>
    )
}