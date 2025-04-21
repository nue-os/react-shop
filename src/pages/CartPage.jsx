import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import css from './CartPage.module.css'
import { formmatCurrency } from '@/utils/feature'
import { updateCartItem } from '@/api/cartApi'

const CartPage = () => {
  const cartItems = useLoaderData()
  const [items, setItems] = useState(cartItems)

  // 장바구니 상품 총 수량 계산
  const totalCount = items.reduce((sum, item) => sum + item.count, 0)

  // 총 계산 금액
  const totalSum = items.reduce(
    (sum, item) => sum + Math.round(item.price * item.count * (1 - item.discount / 100)),
    0
  )

  const decrease = id => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
      )
    )

    const newCount = items.find(item => item.id === id).count - 1
    if (newCount >= 1) updateCartItem(id, newCount)
  }

  const increase = id => {
    setItems(prev => prev.map(item => (item.id === id ? { ...item, count: item.count + 1 } : item)))

    const newCount = items.find(item => item.id === id).count + 1
    updateCartItem(id, newCount)
  }
  return (
    <main>
      <h2>Shopping cart</h2>
      <p>
        장바구니 리스트는 <strong>{items.length}</strong>개이고, 총 상품 개수는{' '}
        <strong>{totalCount}</strong>개 입니다.
      </p>
      <ul className={css.cartList}>
        {items.map(item => (
          <li className={css.cartItem} key={item.id}>
            <div className={css.cartImg}>
              <img src={`/public/img/${item.img}`} alt={item.title} />
            </div>
            <div className={css.title}>{item.title}</div>
            <div className={css.price}>{formmatCurrency(item.price)}</div>
            <div className={css.btnArea}>
              <button onClick={() => decrease(item.id)}>-</button>
              <span>{item.count}</span>
              <button onClick={() => increase(item.id)}>+</button>
            </div>
            <div className={css.sum}>{formmatCurrency(item.price * item.count)}</div>
            <div className={css.deleteBtn}>
              <i className="bi bi-trash"></i>
            </div>
          </li>
        ))}
      </ul>
      <div className={css.totalPrice}>
        총 금액: <strong>{formmatCurrency(totalSum)}</strong>
      </div>
    </main>
  )
}

export default CartPage
