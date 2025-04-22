import React, { useState } from 'react'
import css from './ShopPage.module.css'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import Pagination from '@/components/Pagination'

const ShopPage = () => {
  const { products, per_page } = useLoaderData()
  const { data } = products

  const [isDown, setIsDown] = useState(false)

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const currentCategory = searchParams.get('category')

  const handleCategoryFilter = category => {
    const params = new URLSearchParams(searchParams) // 현재 파라미터 정보 유지
    params.set('_page', 1) // 페이지를 1로 초기화
    params.set('_per_page', per_page) // 페이지당 상품 수를 설정
    category ? params.set('category', category) : params.delete('category') // 카테고리가 없으면 파라미터 제거

    navigate(`/shop/?${params}`)
  }

  const handleSort = sortOption => {
    const params = new URLSearchParams(searchParams) // 현재 파라미터 정보 유지
    params.set('_page', 1)
    params.set('_per_page', per_page)
    params.set('_sort', sortOption)

    setIsDown(false)
    navigate(`/shop/?${params}`)
  }

  const sortCase = searchParams.get('_sort')
  const sortTextMap = {
    id: '등록순',
    price: '낮은 가격순',
    '-price': '높은 가격순',
    discount: '낮은 할인순',
    '-discount': '높은 할인순',
  }
  const getSortText = () => sortTextMap[sortCase] || '등록순'

  return (
    <main className={css.shopPage}>
      <h2>Shop All</h2>
      <div className={css.filterFn}>
        {/* 카테고리 선택 기능 */}
        <div className={css.category}>
          <button
            className={currentCategory === null ? css.active : ''}
            onClick={() => handleCategoryFilter('')}
          >
            전체상품
          </button>
          <button
            className={currentCategory === 'new' ? css.active : ''}
            onClick={() => handleCategoryFilter('new')}
          >
            신상품(new)
          </button>
          <button
            className={currentCategory === 'top' ? css.active : ''}
            onClick={() => handleCategoryFilter('top')}
          >
            인기상품(top)
          </button>
        </div>
        {/* 정렬 기능 */}
        <div className={`${css.sort} ${isDown ? css.active : ''}`}>
          <div className={css.sortHeader} onClick={() => setIsDown(!isDown)}>
            <p>{getSortText()}</p>
            <i className={`bi bi-chevron-${isDown ? 'up' : 'down'}`}></i>
          </div>
          <ul>
            <li className={sortCase === 'id' ? css.active : ''} onClick={() => handleSort('id')}>
              등록순
            </li>
            <li
              className={sortCase === 'price' ? css.active : ''}
              onClick={() => handleSort('price')}
            >
              낮은 가격순
            </li>
            <li
              className={sortCase === '-price' ? css.active : ''}
              onClick={() => handleSort('-price')}
            >
              높은 가격순
            </li>
            <li
              className={sortCase === 'discount' ? css.active : ''}
              onClick={() => handleSort('discount')}
            >
              낮은 할인순
            </li>
            <li
              className={sortCase === '-discount' ? css.active : ''}
              onClick={() => handleSort('-discount')}
            >
              높은 할인순
            </li>
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
