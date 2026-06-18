<script setup>
const route = useRoute();
const competitionId = route.query.competitionId
  ? Number(route.query.competitionId)
  : null;

const match = ref({
  homeTeam: { id: "", name: "" },
  awayTeam: { id: "", name: "" },
  homeTeamGoals: 0,
  awayTeamGoals: 0,
  matchDate: "",
  status: "Scheduled",
  referee: { id: "", firstName: "", lastName: "" },
  competition: { id: competitionId || "", name: "" },
});

function onCancel() {
  navigateTo(`/leagues/${competitionId}`);
}

function onSave() {
  navigateTo(`/leagues/${competitionId}`);
}
</script>

<template>
  <MatchForm v-model="match" @cancel="onCancel" @save="onSave" />
</template>
