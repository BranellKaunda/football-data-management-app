<script setup>
const showSignIn = ref(false);
</script>

<template>
  <div class="mx-auto mt-16 max-w-md">
    <AdminSignup v-if="!showSignIn" />
    <AdminSignin v-else />

    <button
      type="button"
      @click="showSignIn = !showSignIn"
      class="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-800"
    >
      {{ showSignIn ? "Don't have an account? Sign up" : "Already have an account? Sign in" }}
    </button>
  </div>
</template>
