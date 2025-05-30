import axios from 'axios'

export const getTodosData = async () => {
  try {
    const res = await axios.get(`/api/todos/`)
    return res.data
  } catch (err) {
    console.log('[error]', err)
  }
}
