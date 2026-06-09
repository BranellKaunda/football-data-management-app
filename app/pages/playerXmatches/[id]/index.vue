<script setup>
const route = useRoute();
const { getPlayerXMatch } = usePlayerXMatch();
const playerXmatch = await getPlayerXMatch(route.params.id);
</script>
<template>
  <div
    class="bg-white p-6 rounded shadow max-w-md mx-auto m-10 flex flex-col gap-4"
  >
    <h1 class="text-2xl font-bold text-center">
      Player Match Assignment Details
    </h1>
    <div v-if="playerXmatch" class="flex flex-col gap-2">
      <div>
        <p class="text-gray-500 text-sm">ID</p>
        <p class="font-medium">{{ playerXmatch.id }}</p>
      </div>
      <div>
        <p class="text-gray-500 text-sm">Player ID</p>
        <p class="font-medium">{{ playerXmatch.playerId }}</p>
      </div>
      <div>
        <p class="text-gray-500 text-sm">Team ID</p>
        <p class="font-medium">{{ playerXmatch.teamId }}</p>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <NuxtLink
        :to="`/playerXmatches/${playerXmatch.id}/edit`"
        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Edit Assignment
      </NuxtLink>
    </div>
  </div>
</template>
