import React, { useState } from 'react'
import css from './ShopPage.module.css'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import Pagination from '@/components/Pagination'

const ShopPage = () => {
  const navigate = useNavigate()
  const { products, per_page } = useLoaderData()
  const { data } = products

  const [isDown, setIsDown] = useState(false)

  const [searchParams] = useSearchParams()

  const handleCategoryFilter = category => {
    const params = new URLSearchParams(searchParams) // 현재 파라미터 정보 유지
    params.set('_page', 1) // 페이지를 1로 초기화
    params.set('_per_page', per_page) // 페이지당 상품 수를 설정
    category ? params.set('category', category) : params.delete('category') // 카테고리가 없으면 파라미터 제거

    navigate(`/shop/?${params}`)
  }

  return (
    <main className={css.shopPage}>
      <h2>Shop All</h2>
      <div className={css.filterFn}>
        {/* 카테고리 선택 기능 */}
        <div className={css.category}>
          <button className={css.active} onClick={() => handleCategoryFilter('')}>
            전체상품
          </button>
          <button onClick={() => handleCategoryFilter('new')}>신상품(new)</button>
          <button onClick={() => handleCategoryFilter('top')}>인기상품(top)</button>
        </div>
        {/* 정렬 기능 */}
        <div className={`${css.sort} ${isDown ? css.active : ''}`}>
          <div className={css.sortHeader} onClick={() => setIsDown(!isDown)}>
            <p>등록순</p>
            <i className={`bi bi-chevron-${isDown ? 'up' : 'down'}`}></i>
          </div>
          <ul>
            <li className={css.active}>등록순</li>
            <li>낮은 가격순</li>
            <li>높은 가격순</li>
            <li>낮은 할인순</li>
            <li>높은 할인순</li>
          </ul>
        </div>
      </div>
      <div className={css.productList}>
        <ul className={css.list}>
          {data.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </ul>
        <Pagination products={products} />
      </div>
    </main>
  )
}

export default ShopPage
