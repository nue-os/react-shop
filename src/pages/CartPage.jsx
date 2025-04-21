import React from 'react'
import { useLoaderData } from 'react-router-dom'
import css from './CartPage.module.css'

const CartPage = () => {
  const cartItems = useLoaderData()
  console.log(cartItems)

  return (
    <main>
      <h2>Shopping cart</h2>
      <p>
        You have <strong>3</strong> item in your cart
      </p>
      <ul className={css.cartList}>
        <li className={css.cartItem}>
          <div className={css.cartImg}>
            <img src={`/public/img/image1.jpg`} alt="상품명" />
          </div>
          <div className={css.title}>상품명</div>
          <div className={css.price}>가격</div>
          <div className={css.btnArea}>
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>
          <div className={css.sum}>합계</div>
          <div className={css.deleteBtn}>
            <i className="bi bi-trash"></i>
          </div>
        </li>
      </ul>
      <div className={css.totalPrice}>
        총 금액: <strong>1,000,000원</strong>
      </div>
    </main>
  )
}

export default CartPage
