import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

const DetailPage = () => {
  const { productId } = useParams()
  const product = useLoaderData()
  console.log(productId, product)

  return (
    <main>
      <h2>DetailPage</h2>
    </main>
  )
}

export default DetailPage
