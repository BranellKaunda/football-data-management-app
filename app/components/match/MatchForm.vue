<script setup>
const match = defineModel();
const draft = ref({ ...match.value });
const emit = defineEmits(["cancel", "save"]);

async function save() {
  const res = await $fetch(
    `http://localhost:8000/api/matches/${match.value.id}`,
    {
      method: "PATCH",
      body: {
        homeTeamId: draft.value.homeTeam.id,
        awayTeamId: draft.value.awayTeam.id,
        homeTeamGoals: draft.value.homeTeamGoals,
        awayTeamGoals: draft.value.awayTeamGoals,
        matchDate: draft.value.matchDate,
        status: draft.value.status,
        competitionId: draft.value.competition.id,
      },
    },
  );

  match.value = res;
  emit("save");
}

function cancel() {
  draft.value = { ...match.value };
  emit("cancel");
}
</script>

<template>
  <form @submit.prevent="save">
    <input v-model.number="draft.homeTeam.id" placeholder="homeTeamId" />
    <input v-model.number="draft.awayTeam.id" placeholder="awayTeamId" />
    <input v-model.number="draft.homeTeamGoals" placeholder="homeTeamGoals" />
    <input v-model.number="draft.awayTeamGoals" placeholder="awayTeamGoals" />
    <input v-model="draft.matchDate" placeholder="matchDate" />
    <input v-model="draft.status" placeholder="status" />
    <input v-model.number="draft.competition.id" placeholder="competitionId" />
    <button @click="cancel">Cancel</button>
    <button type="submit">Save</button>
  </form>

  <pre>{{ draft }}</pre>
</template> 
