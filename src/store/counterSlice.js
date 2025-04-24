import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 1,
    label: '카운트',
  },
  reducers: {
    increament: (state, action) => {
      state.count += action.payload || 1
    },
    decreament: state => {
      state.count -= 1
    },
    reset: state => {
      state.count = 0
    },
  },
})
export const { increament, decreament, reset } = counterSlice.actions
export default counterSlice.reducer
