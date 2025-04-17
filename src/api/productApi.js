import axios from 'axios'
// const BASE_URL = 'http://localhost:3000/products'

export const getProductsData = async (query = '') => {
  try {
    const res = await axios.get(`/api/products/?${query}`)
    return res.data
  } catch (err) {
    console.log('[error]', err)
    // throw err // 호출된 곳으로 에러 던지기
  }
}

export const getProductById = async id => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    return res.data
  } catch (err) {
    console.log('[error]', err)
  }
}
