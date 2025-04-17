import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import css from './DetailPage.module.css'
import { formmatCurrency } from '@/utils/feature'
import ProductCard from '@/components/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

const DetailPage = () => {
  const { product, relatedProducts } = useLoaderData()
  const [activeTab, setActiveTab] = useState('description')

  const handleTabClick = tab => setActiveTab(tab)

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
