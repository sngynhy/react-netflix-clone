import { useQuery } from "@tanstack/react-query";
import { fetchNowplayingMovie, fetchPopularMovie, fetchTopratedMovie, fetchUpcommingMovie,
    fetchAiringTodayTV, fetchOnTheAirTV, fetchPopularTV, fetchTopratedTV } from 'api/movieApi';

export const movieQueryKey_nowplaying = 'movieNowPlaying'
export const movieQueryKey_popular = 'moviePopular'
export const movieQueryKey_topRated = 'movieTopRated'
export const movieQueryKey_upcomming = 'movieUpcomming'

export const tvQueryKey_airingToday = 'tvAiringToday'
export const tvQueryKey_onTheAir = 'tvOnTheAir'
export const tvQueryKey_popular = 'tvPopular'
export const tvQueryKey_topRated = 'tvTopRated'

const map = new Map()

map.set(movieQueryKey_nowplaying, fetchNowplayingMovie)
map.set(movieQueryKey_popular, fetchPopularMovie)
map.set(movieQueryKey_topRated, fetchTopratedMovie)
map.set(movieQueryKey_upcomming, fetchUpcommingMovie)

map.set(tvQueryKey_airingToday, fetchAiringTodayTV)
map.set(tvQueryKey_onTheAir, fetchOnTheAirTV)
map.set(tvQueryKey_popular, fetchPopularTV)
map.set(tvQueryKey_topRated, fetchTopratedTV)

export const useReactQuery = (props) => {
    const { key } = props
    return useQuery({
        queryKey: [key],
        queryFn: map.get(key),
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
}