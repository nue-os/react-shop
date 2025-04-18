import React from 'react'
import { useLoaderData } from 'react-router-dom'

const CartPage = () => {
  const cartItems = useLoaderData()
  console.log(cartItems)
  return (
    <main>
      <h2>CartPage</h2>
    </main>
  )
}

export default CartPage
