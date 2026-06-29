<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

const email = ref("");
const password = ref("");
const name = ref("");
const error = ref("");

async function handleSignUp() {
  error.value = "";

  const { data, error: signUpError } = await authClient.signUp.email({
    email: email.value,
    password: password.value,
    name: name.value,
  });

  if (signUpError) {
    error.value = signUpError.message || "An error occurred";
    return;
  }

  await navigateTo("/admin");
}
</script>

<template>
  <form
    @submit.prevent="handleSignUp"
    class="flex flex-col gap-4 rounded border p-6 shadow"
  >
    <h1 class="text-xl font-bold">Sign Up</h1>
    <p v-if="error" class="text-red-600">{{ error }}</p>
    <input
      v-model="name"
      type="text"
      placeholder="Name"
      class="rounded border p-2"
    />
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="rounded border p-2"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="rounded border p-2"
    />
    <button
      type="submit"
      class="rounded bg-green-600 p-2 text-white hover:bg-green-700"
    >
      Sign Up
    </button>
  </form>
</template>
