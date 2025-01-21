<script setup>
import { ref, computed, onMounted } from 'vue'
import useDogsStore from '@/stores/dogs'
import Filters from '@/components/Filters.vue'
import Sorting from '@/components/Sorting.vue'
import DogList from '@/components/DogList.vue'
import Pagination from '@/components/Pagination.vue'

const dogStore = useDogsStore()

const filters = ref({
  breeds: [],
  zipCode: '',
  minAge: '',
  maxAge: '',
})

const selectedSort = ref('name:asc')
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(dogStore.total / 25)
})

const applyFilters = async ({ page = currentPage.value, sort = selectedSort.value } = {}) => {
  currentPage.value = page
  selectedSort.value = sort

  try {
    await dogStore.performDogSearch(filters.value, currentPage.value, selectedSort.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const updateFilters = (newFilters) => {
  filters.value = newFilters
  applyFilters({ page: 1 })
}

const handleSortChange = (sortValue) => {
  applyFilters({ sort: sortValue })
}

const handlePageChange = (page) => {
  applyFilters({ page })
}
onMounted(() => {
  dogStore.performDogSearch(filters.value, currentPage.value, selectedSort.value)
})
</script>

<template>
  <v-container>
    <!-- Filters -->
    <Filters @apply-filters="updateFilters" />

    <!-- Sorting -->
    <!-- <Sorting @sort-change="handleSortChange" /> -->

    <!-- Dog List -->
    <DogList :dogs="dogStore.resultIds" />

    <!-- Pagination -->
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </v-container>
</template>
