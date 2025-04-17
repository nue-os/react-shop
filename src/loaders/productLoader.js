import { getProductById } from '@/api/productApi'

export const productDeatailLoader = async ({ params }) => {
  try {
    const product = await getProductById(params.productId)
    if (!product) throw new Response('상품이 존재하지 않습니다.', { status: 404 })
    return product // 리턴 값을 컴포넌트(<DetailPage/>)에서 받을 수 있음
  } catch (err) {
    console.log('[error]', err)
    throw new Response('상품 데이터를 가져오는 중 오류 발생', { status: err.status || 500 })
  }
}
