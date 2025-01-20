<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const name = ref('')

onMounted(() => {
  if (authStore.userLoggedIn) {
    router.push({ name: 'dogsearch' })
  }
})

const login = async () => {
  try {
    await authStore.login(name.value, email.value)

    if (authStore.userLoggedIn) {
      router.push({ name: 'dogsearch' })
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const isLoginButtonDisabled = computed(() => {
  return !email.value || !name.value
})
</script>

<template>
  <v-sheet class="h-screen">
    <v-row>
      <v-col cols="4" class="h-screen background-1 d-flex align-center justify-center">
        <v-icon icon="mdi-paw-outline mr-2" class="header-color text-h1"></v-icon>
        <h1 class="header-color text-h1">Fetch</h1>
      </v-col>

      <v-col cols="8" class="h-screen background-2 d-flex align-center justify-center">
        <v-card width="90%">
          <v-card-title class="headline sign-up">Login</v-card-title>
          <v-form @submit.prevent="login" class="px-3 mt-3">
            <v-text-field v-model="name" label="Enter your name" required></v-text-field>
            <v-text-field
              v-model="email"
              label="Enter your email"
              type="Email"
              required
            ></v-text-field>

            <!-- Use v-col to position the button on the right -->
            <v-col class="text-right" cols="12">
              <v-btn
                type="submit"
                color="blue"
                class="ml-2 text-decoration-none"
                :disabled="isLoginButtonDisabled"
                >Login</v-btn
              >
            </v-col>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style>
.header-color {
  color: #dddddd;
}
.sign-up {
  color: #125d98;
}
.background-1 {
  background-color: #3c8dad;
}
.background-2 {
  background-color: #125d98;
}
</style>
