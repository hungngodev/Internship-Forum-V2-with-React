import axios from 'axios'
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production'){
    dotenv.config();
}
const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID

const UNSPLASH_ROOT = 'https://api.unsplash.com'

const getPhotosByQuery = async ({ query }) => {
    const { data } = await axios.get(
        `${UNSPLASH_ROOT}/search/photos?query=${query}&client_id=${clientId}&per_page=20`
    )
    const resultData = [];
    data.results.map((item) => {
        resultData.push({ url: item.urls.regular, alt: item.alt_description })
    })
    return resultData[Math.floor(Math.random() * resultData.length)].url;
}

export default getPhotosByQuery;