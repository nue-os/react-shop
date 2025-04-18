import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import css from './DetailPage.module.css'
import { formmatCurrency } from '@/utils/feature'
import ProductCard from '@/components/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import DetailTabInfo from '@/organism/DetailTabInfo'

const DetailPage = () => {
  const { product, relatedProducts } = useLoaderData()
  const [isLoading, setIsLoading] = useState(true)

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
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <button className={css.addBtn}>ADD TO CART</button>
          </div>
        </div>
      </div>

      <DetailTabInfo />

      <Swiper
        slidesPerView={4}
        spaceBetween={15}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className={css.detailSlider}
        breakpoints={{
          1100: { slidesPerView: 4 },
          800: { slidesPerView: 3 },
          600: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {relatedProducts.map(item => (
          <SwiperSlide key={item.id}>
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  )
}

export default DetailPage
