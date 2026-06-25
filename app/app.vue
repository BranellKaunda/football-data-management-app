<script setup>
import { authClient } from "~/lib/auth-client";

const { data: session, error } = await authClient.getSession();
</script>

<template>
  <div>
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
        <li class="hover:text-blue-600">
          <NuxtLink to="/player-teams">Transfers</NuxtLink>
        </li>
      </ul>
    </nav>

    <h1 v-if="session">{{ session.name }}</h1>

    <NuxtPage />

    <!-- <TestChild v-model="players" /> -->
    <!-- <TestChild :age="77" :is-married="false" /> -->
  </div>
</template>
