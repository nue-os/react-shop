import React, { useEffect, useState } from 'react'
import css from './Modal.module.css'
import { formmatCurrency } from '@/utils/feature'
import { useNavigate } from 'react-router-dom'

const Modal = ({ product, count, onClose }) => {
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  // transition 효과를 보이기 위해 마운트가 된 후에 isActive를 true를 줌
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true)
      document.body.style.overflow = 'hidden' // 모달 오픈 시 배경 스크롤 제거
    }, 5)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'auto' // 언마운트 시 (모달이 닫히면) 다시 배경 스크롤 생성
    }
  }, [])

  const handleClose = () => {
    setIsActive(false)
    setTimeout(onClose, 300) // transition 시간만큼 setTimeout을 줘서 닫을 때도 효과 적용되도록
  }

  const handleAddToCart = () => {
    // 장바구니 상품을 추가(json-server 추가)

    // 장바구니 페이지로 이동
    navigate('/cart')
  }
  return (
    <div className={`${css.modal} ${isActive ? css.active : ''}`}>
      <div className={css.modalCon}>
        <div className={css.inner}>
          <h2>장바구니</h2>
          <div className={css.imgWrap}>
            <img src={`/public/img/${product.img}`} alt={product.title} />
          </div>
          <div className={css.info}>
            <p>{product.title}</p>
            <p>{formmatCurrency(product.price)}</p>
            {product.discount > 0 && <p>{product.discount}%</p>}
            <p>{count}</p>
            <p>총 가격: {formmatCurrency(product.price * count)}</p>
          </div>
          <button onClick={handleClose}>취소</button>
          <button onClick={handleAddToCart}>장바구니 담기</button>
        </div>
        <button className={css.btnClose} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  )
}

export default Modal
