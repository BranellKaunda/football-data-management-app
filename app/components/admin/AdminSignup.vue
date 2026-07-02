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
    class="card p-6 flex flex-col gap-4"
  >
    <h1 class="text-xl font-bold">Sign Up</h1>
    <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    <input
      v-model="name"
      type="text"
      placeholder="Name"
      class="input"
    />
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="input"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="input"
    />
    <button type="submit" class="btn-primary w-full">Sign Up</button>
  </form>
</template>
