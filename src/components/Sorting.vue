<script setup>
import { ref } from 'vue'

const emits = defineEmits(['sort-change'])

const localSort = ref('name:asc')

const emitSortChange = () => {
  emits('sort-change', localSort.value)
}
</script>

<template>
  <v-row class="d-flex justify-end align-center mb-4">
    <v-col cols="12" md="4" class="d-flex justify-end">
      <v-select
        v-model="localSort"
        :items="[
          { value: 'name:asc', title: 'Name (A-Z)' },
          { value: 'name:desc', title: 'Name (Z-A)' },
          { value: 'age:asc', title: 'Age (Youngest First)' },
          { value: 'age:desc', title: 'Age (Oldest First)' },
        ]"
        label="Sort By"
        variant="solo-filled"
        @change="emitSortChange"
        clearable
      ></v-select>
    </v-col>
  </v-row>
</template>
