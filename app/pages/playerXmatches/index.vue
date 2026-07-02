<script setup>
const { getAllPlayerXMatches } = usePlayerXMatch();
const playerXmatches = await getAllPlayerXMatches();
</script>
<template>
  <div class="max-w-3xl mx-auto p-6">
    <NuxtLink
      to="/playerXmatches/create"
      class="btn-primary mb-4"
      >Create Player Match Assignment</NuxtLink
    >
    <h1 class="text-2xl font-bold mb-6 text-center">
      Player Match Assignments
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" v-if="playerXmatches">
      <div
        v-for="assignment in playerXmatches"
        :key="assignment.id"
        class="card p-4 flex flex-col gap-2"
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
