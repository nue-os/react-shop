import { getCartData } from '@/api/cartApi'

export const cartLoader = async () => {
  try {
    const cartItems = await getCartData()
    if (!cartItems || cartItems.length === 0) return { cartItems: [] }
    return cartItems
  } catch (err) {
    console.log('[error]', err)
    throw new Response('상품 데이터를 가져오는 중 오류 발생', { status: err.status || 500 })
  }
}
