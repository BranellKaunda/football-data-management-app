<script setup>
const route = useRoute();

const { getLeague } = useLeague();
const leagueData = await getLeague(route.params.id);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <div v-if="leagueData" :key="leagueData.id" class="border-b pb-4">
      <p class="text-lg font-semibold">{{ leagueData.name }}</p>

      <div class="flex justify-between text-sm text-gray-700">
        <span>Season:</span>
        <span class="font-medium">{{ leagueData.season }}</span>
      </div>

      <div class="flex justify-between text-sm text-gray-700">
        <span>Rank:</span>
        <span class="font-medium">{{ leagueData.rank }}</span>
      </div>

      <div>
        <NuxtLink
          class="text-blue-600 text-sm mt-2 hover:underline"
          :to="`/leagues/${leagueData.id}/edit`"
          >edit league</NuxtLink
        >
      </div>
    </div>

    <!-- MATCHES -->
    <MatchList />
  </div>
</template>
