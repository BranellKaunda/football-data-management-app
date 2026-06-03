<script setup>
const route = useRoute();
const { data: matchAction } = await useFetch(
  `http://localhost:8000/api/match-actions/${route.params.id}`,
  { query: route.query },
);
</script>
<template>
  <div
    class="bg-white p-6 rounded shadow max-w-md mx-auto m-10 flex flex-col gap-4"
  >
    <h1 class="text-2xl font-bold text-center">Match Action Details</h1>
    <div v-if="matchAction" class="flex flex-col gap-2">
      <div>
        <p class="text-gray-500 text-sm">ID</p>
        <p class="font-medium">{{ matchAction.id }}</p>
      </div>
      <div>
        <p class="text-gray-500 text-sm">Match ID</p>
        <p class="font-medium">{{ matchAction.matchId }}</p>
      </div>
      <div>
        <p class="text-gray-500 text-sm">Player</p>
        <p class="font-medium">
          {{ matchAction.player?.firstName }} {{ matchAction.player?.lastName }}
        </p>
      </div>
      <div>
        <p class="text-gray-500 text-sm">Team</p>
        <p class="font-medium">{{ matchAction.team?.name }}</p>
      </div>
      <div>
        <p class="text-gray-500 text-sm">Action</p>
        <p class="font-medium capitalize">{{ matchAction.action }}</p>
      </div>
      <div>
        <p class="text-gray-500 text-sm">Minute</p>
        <p class="font-medium">{{ matchAction.minute }}</p>
      </div>
      <div v-if="matchAction.playerIdExtra">
        <p class="text-gray-500 text-sm">Extra Player</p>
        <p class="font-medium">
          {{ matchAction.playerExtra?.firstName }} {{ matchAction.playerExtra?.lastName }}
        </p>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <NuxtLink
        :to="`/match-actions/${matchAction.id}/edit`"
        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Edit Action
      </NuxtLink>
    </div>
  </div>
</template>
