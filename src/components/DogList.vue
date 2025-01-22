<script>
import { computed, ref } from 'vue'
import useDogsStore from '@/stores/dogs'

export default {
  setup() {
    const dogsStore = useDogsStore()

    // Reactive filters
    const selectedBreed = ref('')

    // Computed properties for breeds and dogs
    const breeds = computed(() => dogsStore.breeds)
    const dogs = computed(() => dogsStore.dogs)

    // Fetch breeds on component mount
    const fetchBreeds = async () => {
      await dogsStore.getDogBreeds()
    }

    // Perform a dog search
    const searchDogs = async () => {
      const filters = { breeds: selectedBreed.value ? [selectedBreed.value] : [] }
      await dogsStore.performDogSearch(filters)
    }

    // Add to favorites
    const addToFavorites = (dog) => {
      console.log('Added to favorites:', dog)
      // Implement your favorite logic here
    }

    // Fetch breeds on mount
    fetchBreeds()

    return {
      selectedBreed,
      breeds,
      dogs,
      searchDogs,
      addToFavorites,
    }
  },
}
</script>
<template>
  <v-container class="py-4">
    <!-- Dog Cards -->
    <v-row>
      <v-col v-for="dog in dogs" :key="dog.id" cols="12" sm="6" md="4" class="d-flex">
        <v-card class="pa-3">
          <v-img :src="dog.img" alt="Dog image" height="200" width="300"></v-img>
          <v-card-title>{{ dog.name }}</v-card-title>
          <v-card-subtitle>{{ dog.breed }}</v-card-subtitle>
          <v-card-text>
            <div>Age: {{ dog.age }}</div>
            <div>Location: {{ dog.zip_code }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="addToFavorites(dog)">Add to Favorites</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div v-if="dogs.length === 0" class="text-center mt-4">
      <p>No dogs found. Try adjusting your search filters.</p>
    </div>
  </v-container>
</template>
