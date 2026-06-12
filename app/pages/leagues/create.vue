<script setup>
const league = ref({
  name: "",
  season: "",
  rank: null,
});

function onCancel(e) {
  navigateTo("/leagues");
}

function onSave(e) {
  navigateTo(`/leagues/${e.id}`);
}
</script>

<template>
  <LeagueApplicationForm v-model="league" @save="onSave" @cancel="onCancel" />
</template>
