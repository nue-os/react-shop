import { fetchTodos } from '@/store/todoSlice'
import React, { useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { useDispatch, useSelector } from 'react-redux'

const TodoList = () => {
  const dispatch = useDispatch()
  const { todos, status, error } = useSelector(state => state.todo)

  useEffect(() => {
    dispatch(fetchTodos()) // dispatch로 fetchTodos(비동기 액션 생성 함수)을 호출해야 getTodosData() 실행됨
  }, [dispatch])

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'failed') return <div>{error}</div>

  return todos.length === 0 ? (
    <div>텅~</div>
  ) : (
    <ListGroup>
      {todos.map(todo => (
        <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
          <p className="flex-grow-1">{todo.desc}</p>
          <p className="m-2" style={{ fontSize: '0.75em' }}>
            {todo.createdAt}
          </p>
          <i className="bi bi-trash"></i>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default TodoList
