import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import css from './DetailPage.module.css'
import { formmatCurrency } from '@/utils/feature'
import ProductCard from '@/components/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

const DetailPage = () => {
  const { product, relatedProducts } = useLoaderData()
  const [activeTab, setActiveTab] = useState('description')

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

  const handleTabClick = tab => setActiveTab(tab)

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

      <div className={css.tabCon}>
        <ul className={css.tabList}>
          <li
            className={activeTab === 'description' ? css.active : ''}
            onClick={() => handleTabClick('description')}
          >
            Description
          </li>
          <li
            className={activeTab === 'info' ? css.active : ''}
            onClick={() => handleTabClick('info')}
          >
            Additional information
          </li>
          <li
            className={activeTab === 'review' ? css.active : ''}
            onClick={() => handleTabClick('review')}
          >
            Reviews(0)
          </li>
        </ul>
        <div className={css.tabContent}>
          {activeTab === 'description' && (
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium nostrum vel
              nulla aspernatur esse! Dicta, architecto beatae! Maiores veniam culpa omnis numquam,
              recusandae, eius possimus perspiciatis eos libero repellat ullam!
            </div>
          )}
          {activeTab === 'info' && <div>info</div>}
          {activeTab === 'review' && <div>review</div>}
        </div>
      </div>

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
