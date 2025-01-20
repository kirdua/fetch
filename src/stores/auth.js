import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const URL = `https://frontend-take-home-service.fetch.com/`

const saveUserCredentials = (name, email) => {
  const encryptedCredentials = btoa(JSON.stringify({ name, email }))
  localStorage.setItem('userInfo', encryptedCredentials)
}

const getUserCredentials = () => {
  const encryptedCredentials = localStorage.getItem('userInfo')
  if (encryptedCredentials) {
    return JSON.parse(atob(encryptedCredentials))
  }
  return null
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

      userInfo.value = { name, email }
      saveUserCredentials(name, email)
      startReLoginTimer()
      console.log('User logged in successfully')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const reLogin = async () => {
    const credentials = getUserCredentials()
    if (!credentials) {
      console.error('No saved credentials found for re-login')
      return
    }

    try {
      await axios.post(`${URL}auth/login`, credentials, { withCredentials: true })

      userInfo.value = credentials
      console.log('User re-logged in successfully')
    } catch (error) {
      console.error('Re-login failed:', error)
      stopReLoginTimer() // Stop timer if re-login fails
      userInfo.value = null
      clearUserCredentials()
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${URL}auth/logout`, {}, { withCredentials: true })

      userInfo.value = null
      clearUserCredentials()
      stopReLoginTimer()
      console.log('User logged out successfully')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const startReLoginTimer = () => {
    if (reLoginTimer) {
      clearInterval(reLoginTimer) // Clear existing timer if any
    }
    // Set the timer to re-login 1 minute before session expiry (e.g., 59 minutes)
    reLoginTimer = setInterval(
      () => {
        reLogin()
      },
      59 * 60 * 1000,
    )
    console.log('Re-login timer started')
  }

  // Stop re-login timer
  const stopReLoginTimer = () => {
    if (reLoginTimer) {
      clearInterval(reLoginTimer)
      reLoginTimer = null
      console.log('Re-login timer stopped')
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
