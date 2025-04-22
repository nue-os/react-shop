import React, { useState } from 'react'
import css from './ShopPage.module.css'
import { useLoaderData } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'

const ShopPage = () => {
  const { products } = useLoaderData()
  const { data } = products

  const [isDown, setIsDown] = useState(false)
  return (
    <main className={css.shopPage}>
      <h2>Shop All</h2>
      <div className={css.filterFn}>
        {/* 카테고리 선택 기능 */}
        <div className={css.category}>
          <button className={css.active}>전체상품</button>
          <button>신상품(new)</button>
          <button>인기상품(top)</button>
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
        <div className={css.paginationArea}>
          <button>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button>1</button>
          <button className={css.active}>2</button>
          <button>3</button>
          <button>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </main>
  )
}

export default ShopPage
