import axios from 'axios'

export const getCartData = async () => {
  try {
    const res = await axios.get(`/api/cart/`)
    return res.data
  } catch (err) {
    console.log('[error]', err)
  }
}

export const addToCart = async cartItem => {
  console.log(cartItem)
  try {
    // 기존 장바구니 리스트 조회
    const cart = await getCartData()
    // 이미 저장된 리스트가 있는지 확인
    const existingItem = cart.find(item => item.id == cartItem.id)
    // 리스트가 존재하면 count만 증가. put 요청
    if (existingItem) {
      const updateItem = {
        ...existingItem,
        count: existingItem.count + cartItem.count,
      }
      const res = await axios.put(`/api/cart/${existingItem.id}`, updateItem)
      return res.data
    }
    // 리스트가 없으면 전체 데이터 추가. post 요청
    const res = await axios.post('/api/cart/', cartItem)
    return res.data
  } catch (err) {
    console.log('[error]', err)
  }
}

export const updateCartItem = async (id, count) => {
  try {
    // id에 해당하는 상품 가져오기
    const cartItem = await axios.get(`/api/cart/${id}`)
    // 해당 상품 카운트 업데이트
    const updateItem = { ...cartItem.data, count }
    const res = await axios.put(`/api/cart/${id}`, updateItem)
    return res.data
  } catch (err) {
    console.log('[error]', err)
  }
}
