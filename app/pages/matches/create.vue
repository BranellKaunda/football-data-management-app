<script setup>
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

function onCancel(e) {
  navigateTo("/matches");
}

function onSave(e) {
  navigateTo(`/matches/${e.id}`);
}
</script>

<template>
  <MatchForm v-model="match" @cancel="onCancel" @save="onSave" />
</template>
