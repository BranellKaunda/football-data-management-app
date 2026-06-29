<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

const session = authClient.useSession();
const showSignUp = ref(false);
</script>

<template>
  <div class="mx-auto mt-16 max-w-md">
    <div v-if="!session.data">
      <AdminSignin v-if="!showSignUp" />
      <AdminSignup v-else />

      <button
        type="button"
        @click="showSignUp = !showSignUp"
        class="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
      >
        {{ showSignUp ? "Already have an account? Sign In" : "No account? Create one" }}
      </button>
    </div>
    <AdminSignout v-else />
  </div>
</template>
