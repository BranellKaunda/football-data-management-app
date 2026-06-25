<script setup>
import { useSession } from "~/lib/auth-client";

const { data: session } = useSession();
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
        <li class="hover:text-blue-600" v-if="session">
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
