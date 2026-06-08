<script setup>
import { reloadNuxtApp } from "#app";

const match = ref({
  homeTeam: { id: "", name: "" },
  awayTeam: { id: "", name: "" },
  homeTeamGoals: 0,
  awayTeamGoals: 0,
  matchDate: "",
  status: "Scheduled",
  referee: { id: "", firstName: "", lastName: "" },
  competition: { id: "", name: "" },
});

const newCreatedMatch = ref([]);

function onCancel(e) {
  navigateTo("/matches");
}

async function onSave(e) {
  const match = await $fetch(`http://localhost:8000/api/matches/${e.id}`);
  newCreatedMatch.value.push(match);
}
</script>

<template>
  <MatchForm v-model="match" @cancel="onCancel" @save="onSave" />

  <!-- CREATED MATCH -->
  <div v-if="newCreatedMatch.length">
    <MatchMatches :matches="newCreatedMatch" />
  </div>
</template>
