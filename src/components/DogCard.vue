<script setup>
import { defineProps } from 'vue'
import myKit from '@/assets/imgs/kit.jpeg'

const props = defineProps({
  dogId: String,
})
</script>
<template>
  <div>
    <v-card max-width="400">
      <v-img :src="myKit" height="200" cover></v-img>
      {{ props.dogId }}
      <!-- <v-card-title class="text-h6">{{ dog?.name }}</v-card-title>
      <v-card-subtitle class="text-caption">{{ dog?.breed }}</v-card-subtitle>
      <v-card-text class="text-caption">{{ dog?.description }}</v-card-text> -->
      <v-card-actions>
        <v-btn density="compact" icon="mdi-cards-heart-outline"></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
