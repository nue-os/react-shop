import React from 'react'
import { useLoaderData } from 'react-router-dom'
import css from './DetailPage.module.css'
import { formmatCurrency } from '@/utils/feature'

const DetailPage = () => {
  const { product, relatedProducts } = useLoaderData()
  console.log(product, relatedProducts)

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
      <div>탭 메뉴</div>
      <div>관련 상품</div>
    </main>
  )
}

export default DetailPage
