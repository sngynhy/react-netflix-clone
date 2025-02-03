import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { apis } from "api/mediaApi";

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

// 모든 쿼리 키 가져오기
export const useAllQueryKeys = () => { // param: useQueryClient()
    const queryClient = useQueryClient()
    return queryClient.getQueryCache().getAll().map((query) => query.queryKey);
}

// api 호출
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
            queryFn: apis.fetchContents,
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
        queryKey: ['genre', type, genreId],
        queryFn: apis.fetchContentsByGenre,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
}
export const useConetentsByPersonQuery = (props) => {
    const { type, personId } = props
    return useQuery({
        queryKey: ['person', type, personId],
        queryFn: apis.fetchContentsByPerson,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
}
export const useCrditDetailsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: ['cast', type, id],
        queryFn: apis.fetchCreditDetails,
    })
}
export const useSimilarContentsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: ["similar", type, id],
        queryFn: apis.fetchSimilarContents
    })
}
export const useRecommendContentsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: ["recommend", type, id],
        queryFn: apis.fetchRecommendContents
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
            queryFn: apis.fetchTrendingContents,
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
    const { type, id, enabled } = props
    return useQuery({
        queryKey: ["video", type, id],
        queryFn: apis.fetchVideo,
        enabled: !!enabled,
        select: data => {
            return data.length > 0 ? data.find(el => el.site.toLowerCase() === 'youtube' && (el.type === 'Trailer' || el.type === 'Teaser')).key : null
        },
        refetchOnWindowFocus: false // 포커스 시 자동 재요청 방지
    })
}

export const useReactQuery = {
    useAllQueryKeys,
    useConetentsQueries,
    useConetentsByGenreQuery,
    useConetentsByPersonQuery,
    useCrditDetailsQuery,
    useSimilarContentsQuery,
    useRecommendContentsQuery,
    useTrendingContentsQueries,
    useVideoQuery,
}