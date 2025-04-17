import axios from 'axios'
// const BASE_URL = 'http://localhost:3000/banners/'

export const getBannerData = async () => {
  try {
    const res = await axios.get(`/api/banners/`)
    return res.data
  } catch (err) {
    console.log('[error]', err)
    // throw err // 호출된 곳으로 에러 던지기
  }
}
