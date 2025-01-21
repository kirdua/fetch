import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

const API_URL = 'https://frontend-take-home-service.fetch.com/'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // Reactive state
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) || null)

  // Save user info in state and localStorage
  const saveUserInfo = (user) => {
    userInfo.value = user
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  // Clear user info from state and localStorage
  const clearUserInfo = () => {
    userInfo.value = null
    localStorage.removeItem('userInfo')
  }

  // Login method
  const login = async (name, email) => {
    try {
      await axios.post(`${API_URL}auth/login`, { name, email }, { withCredentials: true })
      saveUserInfo({ name, email })
      router.push('/dogsearch') // Redirect to dogsearch after login
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
    }
  }

  // Logout method
  const logout = async () => {
    try {
      await axios.post(`${API_URL}auth/logout`, {}, { withCredentials: true })
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message)
    } finally {
      clearUserInfo()
      router.push('/') // Redirect to login page after logout
    }
  }

  return {
    userInfo,
    login,
    logout,
  }
})

export default useAuthStore
