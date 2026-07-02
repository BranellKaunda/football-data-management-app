<script setup>
const { getAllLeagues } = useLeague();
const { getAllTeams } = useTeam();

const leagues = await getAllLeagues();
const teams = await getAllTeams();

const totalLeagues = computed(() => leagues?.length ?? 0);
const totalTeams = computed(() => teams?.length ?? 0);
</script>

<template>
  <div>
    <div class="max-w-3xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded shadow text-center">
        <p class="text-3xl font-bold">{{ totalLeagues }}</p>
        <p class="text-gray-500 text-sm">Total Leagues</p>
      </div>
      <div class="bg-white p-6 rounded shadow text-center">
        <p class="text-3xl font-bold">{{ totalTeams }}</p>
        <p class="text-gray-500 text-sm">Total Teams</p>
      </div>
    </div>
    <LeagueView />
  </div>
</template>
