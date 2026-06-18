<script setup>
const route = useRoute();

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

const competitionId = ref(null);

function onCancel() {
  navigateTo(`/leagues`);
}

function onSave(e) {
  competitionId.value = e[0].competitionId;
  navigateTo(`/leagues/${competitionId.value}`);
}
</script>

<template>
  <MatchForm v-model="match" @cancel="onCancel" @save="onSave" />
</template>
