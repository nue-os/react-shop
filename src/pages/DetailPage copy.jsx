import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/productApi'

const DetailPage = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId)
        setProduct(data)
      } catch (err) {
        console.log('[error]', err)
      }
    }
    fetchProduct()
  }, [productId])

  return (
    <main>
      <h2>DetailPage</h2>
      <p>{product.title}</p>
    </main>
  )
}

export default DetailPage
