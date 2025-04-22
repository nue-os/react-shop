import { getProductById, getProductsByCategory, getProductsData } from '@/api/productApi'

export const productDeatailLoader = async ({ params }) => {
  try {
    // 상품 ID에 해당하는 정보
    const product = await getProductById(params.productId)
    if (!product) throw new Response('상품이 존재하지 않습니다.', { status: 404 })

    // 상품 ID의 카테고리 정보와 일치하는 상품들
    const relatedProducts = await getProductsByCategory(product.category)
    // 배열에서 product.id와 일치하는 상품을 제외
    const filteredRelatedProducts = relatedProducts.filter(p => p.id !== product.id)

    return { product, filteredRelatedProducts } // 리턴 값을 컴포넌트(<DetailPage/>)에서 받을 수 있음
  } catch (err) {
    console.log('[error]', err)
    throw new Response('상품 데이터를 가져오는 중 오류 발생', { status: err.status || 500 })
  }
}

export const shopLoader = async ({ request }) => {
  const url = new URL(request.url)
  const page = url.searchParams.get('_page') || 1
  const per_page = url.searchParams.get('_per_page') || 12
  const category = url.searchParams.get('category') || ''

  let queryString = `_page=${page}&_per_page=${per_page}`
  category ? (queryString += `&category=${category}`) : queryString

  const products = await getProductsData(queryString)
  return { products, per_page }
}
