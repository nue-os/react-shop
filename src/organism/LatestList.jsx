import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import css from './LatestList.module.css'
import ProductCard from '../components/ProductCard'
import { getProductsData } from '../api/productApi'
import ProductCardSkeleton from '../components/ProductCardSkeleton'

const LatestList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(8)
  const [dropdownText, setDropDownText] = useState('옵션')

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProductsData(`category=new&_limit=${count}`)

        await delay(1000) // 1초 지연

        setProducts(data)
        setLoading(false)
      } catch (err) {
        console.log('[error]', err)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [count])

  const skeletonArr = Array(count).fill(null)

  const updateCount = num => {
    setCount(num)
    setDropDownText(`${num}개`)
  }

  return (
    <section className={css.listCon}>
      <h2>Shop The Latest</h2>
      <Link to={'/shop'} className={css.more}>
        View All
      </Link>
      <div className={css.dropdownWrap}>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {dropdownText}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#" onClick={() => updateCount(2)}>
                2개
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={() => updateCount(4)}>
                4개
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={() => updateCount(6)}>
                6개
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ul className={css.list}>
        {loading
          ? skeletonArr.map((_, idx) => (
              <li key={idx}>
                {/* <div className={css.skeleton}></div> */}
                <ProductCardSkeleton />
              </li>
            ))
          : products.map(item => (
              <li key={item.id}>
                <ProductCard item={item} />
              </li>
            ))}
      </ul>
    </section>
  )
}

export default LatestList
