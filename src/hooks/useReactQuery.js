import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchCreditDetails, fetchContents, fetchSimilarContents, fetchRecommendContents, fetchVideo, fetchContentsByGenre, fetchTrendingContents, fetchContentsByPerson } from "api/movieApi";

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

// 여기부터
export const useConetentsQueries = (type) => {
    const param = {
            movie: [
                {key: 'nowPlaying', content: 'now_playing', headerTitle: 'Now Playing In Theaters'},
                {key: 'topRated', content: 'top_rated', headerTitle: 'Top Rated'},
                {key: 'popular', content: 'popular', headerTitle: 'Popular'},
                {key: 'upcoming', content: 'upcoming', headerTitle: 'Upcoming'},
            ],
            tv: [
                {key: 'onTheAir', content: 'on_the_air', headerTitle: 'On The Air'},
                {key: 'topRated', content: 'top_rated', headerTitle: 'Top Rated'},
                {key: 'popular', content: 'popular', headerTitle: 'Popular'},
                {key: 'airingToday', content: 'airing_today', headerTitle: 'Airing Today'},
            ]
    }
    const queries = useQueries({
        queries: param[type].map(el => ({
            queryKey: [el.key, type, el.content],
            queryFn: fetchContents,
            select: (data) => ({
                // select 속성에 메타 데이터 추가
                type: type,
                key: el.key,
                title: el.headerTitle,
                data: data.filter(el => el.backdrop_path !== null && el.poster !== null)
            }),
        }))
    })
    return queries
}
export const useConetentsByGenreQuery = (props) => {
    const { type, genreId } = props
    return useQuery({
        queryKey: [genreId, type, genreId],
        queryFn: fetchContentsByGenre,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
}
export const useConetentsByPersonQuery = (props) => {
    const { type, personId } = props
    return useQuery({
        queryKey: [type, personId],
        queryFn: fetchContentsByPerson,
    })
}
export const useCrditDetailsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: ['cast', type, id],
        queryFn: fetchCreditDetails,
    })
}
export const useSimilarContentsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: ["similar", type, id],
        queryFn: fetchSimilarContents
    })
}
export const useRecommendContentsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: ["recommend", type, id],
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
        queryKey: ["video", type, id],
        queryFn: fetchVideo,
        select: data => {
            return data.length > 0 ? data.find(el => el.type === 'Trailer' || el.type === 'Teaser').key : null
        },
        refetchOnWindowFocus: false // 포커스 시 자동 재요청 방지
    })
}

export const getAllQueryKeys = (queryClient) => { // param: useQueryClient()
    // 모든 쿼리 키 가져오기
    return queryClient.getQueryCache().getAll().map((query) => query.queryKey);
}

