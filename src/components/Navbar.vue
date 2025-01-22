<script setup>
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const items = [
  {
    title: 'Logout',
    icon: 'mdi-logout',
  },
]

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
<template>
  <v-app-bar :elevation="2" color="dark-blue" flat class="justify-end dropshadow">
    <template v-slot:prepend>
      <v-app-bar-title class="text-white">
        <h2>Find your best friend!</h2>
      </v-app-bar-title>
    </template>

    <v-spacer></v-spacer>

    <v-menu open-on-hover class="justify-end">
      <template v-slot:activator="{ props }">
        <v-btn icon color="white" v-bind="props">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="logout">
          <v-list-item-content class="custom-list-item">
            <v-list-item-icon class="mr-2">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.custom-list-item {
  display: inline-flex;
}
</style>
