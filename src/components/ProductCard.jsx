import React from 'react'
import { Link } from 'react-router-dom'
import css from './ProductCard.module.css'
import { formmatCurrency } from '../utils/feature'

const ProductCard = ({ item }) => {
  return (
    <div className={css.card}>
      <div className={css.imgWrap}>
        <img src={`/public/img/${item.img}`} alt={item.title} />
        <span className={css.cate}>{item.category}</span>
        {item.discount > 0 && <span className={css.discount}>{item.discount}%</span>}
      </div>
      <div className={css.textWrap}>
        <strong className={css.title}>{item.title}</strong>
        <span className={css.price}>{formmatCurrency(item.price)}</span>
      </div>
      <Link to={`/detail/${item.id}`} className={css.btnGoDetail}></Link>
    </div>
  )
}

export default React.memo(ProductCard)
