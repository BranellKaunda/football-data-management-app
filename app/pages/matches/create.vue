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

const newCreatedMatch = ref([]);

function onCancel(e) {
  navigateTo("/matches");
}

async function onSave(e) {
  const match = await $fetch(`http://localhost:8000/api/matches/${e.id}`);
  newCreatedMatch.value.push(match);
  //localStorage.setItem("newCreatedMatch", JSON.stringify(newCreatedMatch.value));
}

function onDelete(matchId) {
  newCreatedMatch.value = newCreatedMatch.value.filter((m) => m.id !== matchId);
}
</script>

<template>
  <MatchForm v-model="match" @cancel="onCancel" @save="onSave" />

  <!-- CREATED MATCHES -->
  <div v-if="newCreatedMatch.length">
    <MatchList
      :matches="newCreatedMatch"
      :delete-button="true"
      @deleted="onDelete"
    />
  </div>
</template>
