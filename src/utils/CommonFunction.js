export function getGenresById (data, genres) {
    // 장르의 id값으로 name 추출
    return data.map(el => genres.find(g => g.id === el).name)
}