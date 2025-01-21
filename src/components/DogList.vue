<script setup>
import { defineProps } from 'vue'
import DogCard from '@/components/DogCard.vue'

const props = defineProps({
  dogs: Array,
})
</script>

<template>
  <v-row>
    <v-col v-for="id in dogs" :key="id" cols="12" md="4" class="mb-4">
      <DogCard :dogId="id" />
    </v-col>
  </v-row>
</template>
