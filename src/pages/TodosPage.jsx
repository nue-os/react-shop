import TodoInput from '@/components/TodoInput'
import TodoList from '@/components/TodoList'
import TodoSearch from '@/components/TodoSearch'
import React from 'react'

const TodosPage = () => {
  return (
    <main>
      <h2>TodosPage</h2>
      <TodoSearch />
      <TodoInput />
      <TodoList />
    </main>
  )
}

export default TodosPage
