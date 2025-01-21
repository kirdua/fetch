import { ref } from 'vue'
import { defineStore } from 'pinia'

const URL = 'https://frontend-take-home-service.fetch.com'

const useDogsStore = defineStore('dogs', () => {
  const breeds = ref([])
  const resultIds = ref([])
  const total = ref(0)
  const currentPage = ref(1)

  const getDogBreeds = async () => {
    try {
      const response = await fetch(`${URL}/dogs/breeds`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Error fetching breeds: ${response.statusText}`)
      }

      breeds.value = await response.json()
    } catch (error) {
      console.error('Error fetching breeds:', error)
    }
  }

  const performDogSearch = async (filters, page = 1, sort = 'name:asc') => {
    try {
      const params = new URLSearchParams()

      if (Array.isArray(filters.breeds) && filters.breeds.length > 0) {
        filters.breeds.forEach((breed) => params.append('breeds', breed))
      }
      if (filters.zipCode) {
        params.append('zipCode', filters.zipCode)
      }
      if (filters.minAge) {
        params.append('ageMin', filters.minAge)
      }
      if (filters.maxAge) {
        params.append('ageMax', filters.maxAge)
      }
      if (sort) {
        params.append('sort', sort)
      }

      const pageSize = 25
      params.append('size', pageSize)
      params.append('from', (page - 1) * pageSize)

      const response = await fetch(`${URL}/dogs/search?${params.toString()}`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Error fetching dogs: ${response.statusText}`)
      }

      const data = await response.json()
      resultIds.value = data.resultIds // Update the result IDs
      total.value = data.total // Update total number of results
      currentPage.value = page // Update the current page
    } catch (error) {
      console.error('Error fetching dogs:', error)
    }
  }

  return { breeds, resultIds, total, currentPage, getDogBreeds, performDogSearch }
})

export default useDogsStore
