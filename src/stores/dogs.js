import { ref } from 'vue'
import { defineStore } from 'pinia'

const URL = 'https://frontend-take-home-service.fetch.com'

const useDogsStore = defineStore('dogs', () => {
  const breeds = ref([])
  const resultIds = ref([])
  const total = ref(0)
  const currentPage = ref(1)
  const dogs = ref([])

  const getDogBreeds = async () => {
    try {
      const response = await fetch(`${URL}/dogs/breeds`, {
        method: 'GET',
        credentials: 'include',
      })
      if (!response.ok) throw new Error(`Error fetching breeds: ${response.statusText}`)
      breeds.value = await response.json()
    } catch (error) {
      console.error('Error fetching breeds:', error)
    }
  }

  const performDogSearch = async (filters, page = 1, sort = 'breed:asc') => {
    try {
      const params = new URLSearchParams()

      if (Array.isArray(filters.breeds) && filters.breeds.length > 0) {
        filters.breeds.forEach((breed) => params.append('breeds', breed))
      }
      if (filters.zipCode) params.append('zipCodes', filters.zipCode)
      if (filters.minAge) params.append('ageMin', filters.minAge)
      if (filters.maxAge) params.append('ageMax', filters.maxAge)
      if (sort) params.append('sort', sort)

      const pageSize = 25
      params.append('size', pageSize)
      params.append('from', (page - 1) * pageSize)

      const response = await fetch(`${URL}/dogs/search?${params.toString()}`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) throw new Error(`Error fetching dogs: ${response.statusText}`)

      const data = await response.json()
      resultIds.value = data.resultIds
      total.value = data.total
      currentPage.value = page

      await fetchDogDetails()
    } catch (error) {
      console.error('Error fetching dogs:', error)
    }
  }

  const fetchDogDetails = async () => {
    try {
      if (resultIds.value.length === 0) return

      const response = await fetch(`${URL}/dogs`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultIds.value),
      })

      if (!response.ok) throw new Error(`Error fetching dog details: ${response.statusText}`)
      const fetchedDogs = await response.json()

      // Sort dogs alphabetically by breed
      dogs.value = fetchedDogs.sort((a, b) => a.breed.localeCompare(b.breed))
    } catch (error) {
      console.error('Error fetching dog details:', error)
    }
  }

  return {
    breeds,
    resultIds,
    total,
    currentPage,
    dogs,
    getDogBreeds,
    performDogSearch,
  }
})

export default useDogsStore
