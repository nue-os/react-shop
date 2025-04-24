import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 1,
    label: '카운트',
  },
  reducers: {
    increament: state => {
      state.count += 1
    },
    decreament: state => {
      state.count -= 1
    },
  },
})
export const { increament, decreament } = counterSlice.actions
export default counterSlice.reducer
