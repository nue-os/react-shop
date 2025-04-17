import React from 'react'
import { useLoaderData } from 'react-router-dom'

const DetailPage = () => {
  const product = useLoaderData()

  return (
    <main>
      <h2>DetailPage</h2>
      <p>{product.title}</p>
    </main>
  )
}

export default DetailPage
