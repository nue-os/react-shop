import { createSlice } from '@reduxjs/toolkit'

const savedTheme = localStorage.getItem('theme')
const isDarkmode = savedTheme !== null ? JSON.parse(savedTheme) : false

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkmode,
  },
  reducers: {
    toggleTheme: state => {
      state.isDarkmode = !state.isDarkmode
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
