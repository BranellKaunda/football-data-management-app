<script setup>
import { useSession } from "~/lib/auth-client";

const { data: session } = useSession();

const { getAllPlayerXMatches } = usePlayerXMatch();
const playerXmatches = await getAllPlayerXMatches();
</script>
<template>
  <div class="max-w-3xl mx-auto p-6">
    <NuxtLink
      v-if="session"
      to="/playerXmatches/create"
      class="inline-block mb-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >Create Player Match Assignment</NuxtLink
    >
    <h1 class="text-2xl font-bold mb-6 text-center">
      Player Match Assignments
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" v-if="playerXmatches">
      <div
        v-for="assignment in playerXmatches"
        :key="assignment.id"
        class="bg-white p-4 rounded shadow flex flex-col gap-2"
      >
        <NuxtLink
          :to="`/playerXmatches/${assignment.id}`"
          class="font-semibold text-lg hover:text-blue-600"
        >
          Assignment #{{ assignment.id }}
        </NuxtLink>
        <p class="text-gray-600 text-sm">
          Player ID: {{ assignment.playerId }}
        </p>
        <p class="text-gray-600 text-sm">Team ID: {{ assignment.teamId }}</p>
      </div>
    </div>
  </div>
</template>
