<script setup>
import { ref, onMounted } from 'vue'
import useDogsStore from '@/stores/dogs'

const emits = defineEmits(['apply-filters'])

const localFilters = ref({
  breeds: [],
  zipCode: '',
  minAge: '',
  maxAge: '',
})

const dogStore = useDogsStore()

const emitFilters = () => {
  emits('apply-filters', localFilters.value)
}

onMounted(() => {
  dogStore.getDogBreeds()
})
</script>

<template>
  <v-row class="d-flex justify-center align-center pa-2">
    <v-col cols="12" md="4">
      <v-select
        v-model="localFilters.breeds"
        :items="dogStore.breeds"
        label="Select Breed"
        variant="solo-filled"
        multiple
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2">{{ item.title }}</v-chip>
          <span v-if="index === 2" class="text-grey text-caption align-self-center">
            (+{{ localFilters.breeds.length - 2 }} others)
          </span>
        </template>
      </v-select>
    </v-col>
    <v-col cols="12" md="2">
      <v-text-field
        v-model="localFilters.zipCode"
        label="Zip Code"
        variant="solo-filled"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="2">
      <v-text-field
        v-model="localFilters.minAge"
        label="Min Age"
        variant="solo-filled"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="2">
      <v-text-field
        v-model="localFilters.maxAge"
        label="Max Age"
        variant="solo-filled"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="2" class="d-flex align-center">
      <v-btn
        @click="emitFilters"
        color="primary"
        block
        variant="text"
        :style="{ height: '56px', marginTop: '-20px' }"
      >
        Apply Filters
      </v-btn>
    </v-col>
  </v-row>
</template>
