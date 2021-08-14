const axios = require('axios');
const { OMDB_API_KEY } = process.env;
/**
 * 중요! netlify serverless function은 비동기!
 */
exports.handler = async function (event) {
    const payload = JSON.parse(event.body);
    console.log(payload);

    const { title, type, year, page, id } = payload;
    const url = id
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s&i=${id}&plot=full`
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    const { data } = await axios.get(url);
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}