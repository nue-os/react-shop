import { getTodosData } from '@/api/todoApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const response = await getTodosData()
  return response
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.todos = action.payload
        state.error = null
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
