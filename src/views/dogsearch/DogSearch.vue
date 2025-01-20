<script setup>
import { ref, onMounted, computed } from 'vue'
import useDogsStore from '@/stores/dogs'
import DogCard from '@/components/DogCard.vue'

const dogStore = useDogsStore()

const filters = ref({
  breeds: [],
  zipCode: '',
  minAge: '',
  maxAge: '',
})

const currentPage = ref(1)

onMounted(() => {
  dogStore.getDogBreeds()
})

const totalPages = computed(() => {
  return Math.ceil(dogStore.total / 25)
})

const applyFilters = async () => {
  try {
    await dogStore.performDogSearch(filters.value)
    currentPage.value = 1
  } catch (error) {
    console.error('Error fetching dogs:', error)
  }
}

const handlePageChange = async () => {
  try {
    await dogStore.performDogSearch(filters.value, currentPage.value)
  } catch (error) {
    console.error('Error fetching dogs:', error)
  }
}
</script>

<template>
  <v-container>
    <!-- Filters -->
    <v-row class="d-flex justify-center align-center pa-2">
      <v-col cols="12" md="4">
        <v-select
          v-model="filters.breeds"
          :items="dogStore.breeds"
          label="Select Breed"
          variant="solo-filled"
          multiple
          clearable
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 2">{{ item.title }}</v-chip>
            <span v-if="index === 2" class="text-grey text-caption align-self-center">
              (+{{ filters.breeds.length - 2 }} others)
            </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="filters.zipCode"
          label="Zip Code"
          variant="solo-filled"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="filters.minAge"
          label="Min Age"
          variant="solo-filled"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="filters.maxAge"
          label="Max Age"
          variant="solo-filled"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2" class="d-flex align-center">
        <v-btn
          @click="applyFilters"
          color="primary"
          block
          :style="{ height: '56px', marginTop: '-20px' }"
        >
          Apply Filters
        </v-btn>
      </v-col>
    </v-row>

    <!-- Dog List -->
    <v-row class="mt-5">
      <v-col cols="12" v-if="dogStore.resultIds.length">
        <v-row>
          <v-col v-for="id in dogStore.resultIds" :key="id" cols="12" md="4" class="mb-4">
            <DogCard :dogId="id" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                rounded="circle"
                class="my-4"
                active-color="light-teal"
                @click="handlePageChange"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-else>
        <p class="text-center">No dogs found. Try adjusting your filters.</p>
      </v-col>
    </v-row>
  </v-container>
</template>
