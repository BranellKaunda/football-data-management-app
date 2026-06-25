<script setup>
import { authClient } from "~/lib/auth-client";

const error = ref("");

async function handleSignOut() {
  error.value = "";

  const { error: signOutError } = await authClient.signOut();

  if (signOutError) {
    error.value = signOutError.message || "An error occurred";
    return;
  }

  await navigateTo("/");
}
</script>

<template>
  <div class="bg-gray-800 text-white">
    <form @submit.prevent="handleSignOut" class="rounded p-4">
      <p v-if="error" class="text-red-600">{{ error }}</p>
      <button type="submit" class="rounded p-2 text-white hover:text-blue-700">
        Sign Out
      </button>
    </form>
  </div>
</template>
