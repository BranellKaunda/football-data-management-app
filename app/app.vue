<script setup>
import { authClient } from "~/lib/auth-client";

const session = authClient.useSession();
const authError = useState("authError", () => null);
</script>

<template>
  <div>
    <div
      v-if="authError"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
      role="alert"
    >
      <span class="block sm:inline">{{ authError }}</span>
      <span
        class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
        @click="authError = null"
      >
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"
          />
        </svg>
      </span>
    </div>

    <nav class="bg-gray-800 text-white p-4">
      <ul class="flex flex-row gap-4 justify-end">
        <li class="hover:text-blue-600">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li class="hover:text-blue-600">
          <NuxtLink to="/teams">Teams</NuxtLink>
        </li>
        <li class="hover:text-blue-600">
          <NuxtLink to="/leagues">Leagues</NuxtLink>
        </li>
        <li class="hover:text-blue-600" v-if="session.data">
          <NuxtLink to="/player-teams">Transfers</NuxtLink>
        </li>
        <li class="hover:text-blue-600">
          <NuxtLink to="/admin">Admin</NuxtLink>
        </li>
      </ul>
    </nav>

    <NuxtPage />
  </div>
</template>
