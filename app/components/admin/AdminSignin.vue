<script setup>
import { authClient } from "~/lib/auth-client";

const email = ref("");
const password = ref("");
const error = ref("");
const session = authClient.useSession();

async function handleSignIn() {
  error.value = "";

  const { data, error: signInError } = await authClient.signIn.email({
    email: email.value,
    password: password.value,
  });

  if (signInError) {
    error.value = signInError.message || "An error occurred";
    return;
  }

  await session.value.refetch();
  await navigateTo("/");
}
</script>

<template>
  <div class="mx-auto mt-16 max-w-md">
    <form
      @submit.prevent="handleSignIn"
      class="card p-6 flex flex-col gap-4"
    >
      <h1 class="text-xl font-bold">Sign In</h1>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
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
      <button type="submit" class="btn-primary w-full">Sign In</button>
    </form>
  </div>
</template>
