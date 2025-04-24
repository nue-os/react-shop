import Counter from '@/components/Counter'
import { decreament, increament, reset } from '@/store/counterSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

const BlogPage = () => {
  const dispatch = useDispatch()

  return (
    <main>
      <h2>BlogPage</h2>
      <Counter />
      <Counter />
      <Counter />
      <button onClick={() => dispatch(increament())}>증가하기</button>
      <button onClick={() => dispatch(increament(10))}>증가하기(10)</button>
      <button onClick={() => dispatch(decreament())}>감소하기</button>
      <button onClick={() => dispatch(reset())}>리셋하기</button>
    </main>
  )
}

export default BlogPage
