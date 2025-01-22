import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://frontend-take-home-service.fetch.com/'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    userIsLoggedIn: localStorage.getItem('userInfo') !== null,
  }),
  actions: {
    async login(name, email) {
      try {
        await axios.post(`${API_URL}auth/login`, { name, email }, { withCredentials: true })
        this.userInfo = { name, email }
        this.userIsLoggedIn = true
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message)
        this.userIsLoggedIn = false // Ensure state is updated if login fails
      }
    },
    async logout() {
      try {
        await axios.post(`${API_URL}auth/logout`, {}, { withCredentials: true })
        localStorage.removeItem('userInfo')
        this.userInfo = null
        this.userIsLoggedIn = false
      } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message)
      }
    },
  },
})

export default useAuthStore
