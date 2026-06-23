<script setup>
import { authClient } from "~/lib/auth-client";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

async function handleSignUp() {
  error.value = "";
  const { data, error: signUpError } = await authClient.signUp.email({
    name: name.value,
    email: email.value,
    password: password.value,
  });
  if (signUpError) {
    error.value = signUpError.message || "An error occurred";
    return;
  }
  await navigateTo("/");
}
</script>

<template>
  <div class="mx-auto mt-16 max-w-md">
    <form
      @submit.prevent="handleSignUp"
      class="flex flex-col gap-4 rounded border p-6 shadow"
    >
      <h1 class="text-xl font-bold">Sign Up</h1>
      <p v-if="error" class="text-red-600">{{ error }}</p>
      <input v-model="name" placeholder="Name" class="rounded border p-2" />
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
        class="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>
