import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import css from './DetailPage.module.css'
import { formmatCurrency } from '@/utils/feature'
import DetailTabInfo from '@/organism/DetailTabInfo'
import SimilarProducts from '@/organism/SimilarProducts'
import Modal from '@/components/Modal'

const DetailPage = () => {
  const { product, filteredRelatedProducts } = useLoaderData()

  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [count, setCount] = useState(1)

  useEffect(() => {
    // 컴포넌트가 마운트된 직후에는 로딩 상태로 표시
    setIsLoading(true)

    // 데이터가 로드된 후 로딩 상태 해제
    if (product && product.id) {
      // 약간의 지연 효과를 줘서 로딩 화면을 확인할 수 있도록
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [product])

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  const decrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1))
  const increase = () => setCount(prev => prev + 1)

  const handleAddToCart = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main>
      <h2 hidden>DetailPage</h2>
      <div className={css.detailCon}>
        <div className={css.imgWrap}>
          <img src={`/public/img/${product.img}`} alt={product.title} />
          {product.discount > 0 && <p className={css.discount}>{product.discount}%</p>}
        </div>
        <div className={css.infoWrap}>
          <p className={css.title}>{product.title}</p>
          <p className={css.price}>{formmatCurrency(product.price)}</p>
          <p className={css.category}>{product.category}</p>
          <div className={css.btnWrap}>
            <div className={css.counterArea}>
              <button onClick={decrease}>-</button>
              <span>{count}</span>
              <button onClick={increase}>+</button>
            </div>
            <button className={css.addBtn} onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* 탭 정보 */}
      <DetailTabInfo />

      {/* 관련 카테고리 상품 슬라이더 */}
      <SimilarProducts products={filteredRelatedProducts} />

      {/* 장바구니 모달 */}
      {isModalOpen && <Modal product={product} count={count} onClose={closeModal} />}
    </main>
  )
}

export default DetailPage
