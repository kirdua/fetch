<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['page-change'])

// Initialize localPage as reactive and sync with currentPage
const localPage = ref(props.currentPage)

watch(
  () => props.currentPage,
  (newValue) => {
    localPage.value = newValue // Update localPage when currentPage changes
  },
)

const emitPageChange = () => {
  emits('page-change', localPage.value) // Emit page-change event
}
</script>

<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-container class="max-width">
        <v-pagination
          v-model="localPage"
          :length="totalPages"
          rounded="circle"
          active-color="primary"
          @click="emitPageChange"
        ></v-pagination>
      </v-container>
    </v-col>
  </v-row>
</template>
