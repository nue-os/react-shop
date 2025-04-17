import React from 'react'
import { useLoaderData } from 'react-router-dom'

const DetailPage = () => {
  const { product, relatedProducts } = useLoaderData()
  console.log(relatedProducts)

  return (
    <main>
      <h2>DetailPage</h2>
      <p>{product.title}</p>
    </main>
  )
}

export default DetailPage
