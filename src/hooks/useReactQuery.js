import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchCreditDetails, fetchContents, fetchSimilarContents, fetchRecommendContents, fetchVideo, fetchContentsByGenre, fetchTrendingContents } from "api/movieApi";

export const useContentsQueryKey = {
    movie: {
        type: 'movie',
        nowPlaying: 'now_playing',
        topRated: 'top_rated',
        popular: 'popular',
        upcoming: 'upcoming',
    },
    tv: {
        type: 'tv',
        onTheAir: 'on_the_air',
        airingToday: 'airing_today',
        topRated: 'top_rated',
        popular: 'popular',
    }
}
export const useConetentsQuery = (props) => {
    const { key, type, content } = props
    return useQuery({
        queryKey: [key, type, content],
        queryFn: fetchContents,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
}
export const useConetentsByGenreQuery = (props) => {
    const { type, genreId } = props
    return useQuery({
        queryKey: [type +'_' + genreId, type, genreId],
        queryFn: fetchContentsByGenre,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
}
export const useCrditDetailsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: [id + '_cast', type],
        queryFn: fetchCreditDetails,
    })
}
export const useSimilarContentsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: [id + "_similar", type, id],
        queryFn: fetchSimilarContents
    })
}
export const useRecommendContentsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: [id + "_recommend", type, id],
        queryFn: fetchRecommendContents
    })
}

export const useTrendingContentsQueries = () => {
    const param = [
        {type: 'all', period: 'week'},
        // {type: 'movie', period: 'week'},
        // {type: 'tv', period: 'week'},
        {type: 'all', period: 'day'},
        // {type: 'movie', period: 'day'},
        // {type: 'tv', period: 'day'},
    ]
    const queries = useQueries({
        queries: param.map(el => ({
            queryKey: ['trending', el.type, el.period],
            queryFn: fetchTrendingContents,
            select: (data) => ({
                // select 속성에 메타 데이터 추가
                type: el.type,
                period: el.period,
                data: data.filter(el => el.backdrop_path !== null && el.poster !== null)
            }),
        }))
    })
    return queries
}
export const useVideoQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: [id + "_video", type, id],
        queryFn: fetchVideo,
        select: data => data.find(el => el.type === 'Trailer' || el.type === 'Teaser').key
    })
}

export const getAllQueryKeys = (queryClient) => { // param: useQueryClient()
    // 모든 쿼리 키 가져오기
    // const allQueryKeys = queryClient.getQueryCache().getAll().map((query) => query.queryKey)
    // console.log(allQueryKeys)
    return queryClient.getQueryCache().getAll().map((query) => query.queryKey);
}

