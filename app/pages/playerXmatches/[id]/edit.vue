<script setup>
const route = useRoute();
const playerXmatchId = route.params.id;
const { data: playerXmatch } = await useFetch(
  `http://localhost:8000/api/player-x-matches/${playerXmatchId}`,
);
const onCancel = () => {
  navigateTo(`/playerXmatches/${playerXmatchId}`);
};
const onSave = () => {
  navigateTo(`/playerXmatches/${playerXmatchId}`);
};
</script>
<template>
  <div class="max-w-3xl mx-auto p-6 mt-6">
    <h1 class="text-2xl font-bold mb-6 text-center">
      Edit Player-Match Association
    </h1>
    <PlayerXmatchesForm
      v-if="playerXmatch"
      :matchId="playerXmatch.matchId"
      :homeTeamPlayers="playerXmatch.homeTeamPlayers"
      :awayTeamPlayers="playerXmatch.awayTeamPlayers"
      :homeTeamName="playerXmatch.homeTeamName"
      :awayTeamName="playerXmatch.awayTeamName"
      @save="onSave"
    />
    <div v-else class="text-center text-gray-500">Loading...</div>
  </div>
</template>
