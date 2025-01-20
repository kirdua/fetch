import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const URL = `https://frontend-take-home-service.fetch.com/`

const getUserCredentials = () => {
  const storedCredentials = localStorage.getItem('userInfo')
  if (storedCredentials) {
    return JSON.parse(storedCredentials) // Parse the JSON string
  }
  return null
}

const saveUserCredentials = (currentUser) => {
  localStorage.setItem('userInfo', JSON.stringify(currentUser)) // Save as JSON string
}

const clearUserCredentials = () => {
  localStorage.removeItem('userInfo')
}

const useAuthStore = defineStore('auth', () => {
  const userInfo = ref(getUserCredentials())
  const userLoggedIn = computed(() => userInfo.value !== null)
  let reLoginTimer = null

  const login = async (name, email) => {
    try {
      await axios.post(`${URL}auth/login`, { name, email }, { withCredentials: true })

      const currentUser = { name, email }
      userInfo.value = currentUser
      saveUserCredentials(currentUser)
      startReLoginTimer()
      console.log('User logged in successfully')
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
    }
  }

  const reLogin = async () => {
    const credentials = getUserCredentials()
    if (!credentials) {
      console.error('No saved credentials found for re-login')
      stopReLoginTimer()
      userInfo.value = null
      return
    }

    try {
      await axios.post(`${URL}auth/login`, credentials, { withCredentials: true })

      userInfo.value = credentials // Update userInfo in memory
      saveUserCredentials(credentials) // Update in localStorage
      console.log('User re-logged in successfully')
    } catch (error) {
      console.error('Re-login failed:', error.response?.data || error.message)
      stopReLoginTimer()
      userInfo.value = null
      clearUserCredentials()
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${URL}auth/logout`, {}, { withCredentials: true })

      userInfo.value = null
      stopReLoginTimer()
      console.log('User logged out successfully')
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message)
    }
  }

  const startReLoginTimer = () => {
    if (reLoginTimer) {
      clearInterval(reLoginTimer) // Clear existing timer if any
    }
    reLoginTimer = setInterval(
      () => {
        reLogin()
      },
      57 * 60 * 1000,
    )
    console.log('Re-login timer started')
  }

  const stopReLoginTimer = () => {
    if (reLoginTimer) {
      clearInterval(reLoginTimer)
      clearUserCredentials()
      reLoginTimer = null
    }
  }

  return {
    userInfo,
    userLoggedIn,
    login,
    reLogin,
    logout,
    startReLoginTimer,
    stopReLoginTimer,
  }
})

export default useAuthStore
