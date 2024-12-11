export const getGenresById = (data, genres) => {
    // 장르의 id값으로 name 추출
    // console.log('getGenresById', data, genres)
    return data.reduce((acc, curr) => {
        const find = genres.find(g => g.id === curr)
        if (find) acc.push(find.name)
        return acc
    }, [])
}

export const getContentImg = (path) => {
    return `https://image.tmdb.org/t/p/original${path}`
}
export const getContentVedio = (key) => {
    // param info
    // 자동재생 autoplay = 0 or 1
    // 시작, 끝나는 시간 start = 61 / end = 120
    // 영상 컨트롤러 표시 controls = 0 or 1
    // 로고 표시 modestbranding = 0 or 1
    // 반복 재생 loop = 1 & playlist =비디오_ID
    // 관련 영상 표시 rel = 0 or 1
    return `https://www.youtube-nocookie.com/embed/${key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1`
}