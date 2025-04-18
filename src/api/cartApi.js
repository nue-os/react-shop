import axios from 'axios'

export const getCartData = async () => {
  try {
    const res = await axios.get(`/api/cart/`)
    return res.data
  } catch (err) {
    console.log('[error]', err)
  }
}
