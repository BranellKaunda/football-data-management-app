<script setup>
const route = useRoute();
const recordId = route.params.id;

const { getPlayerTeam } = usePlayerTeam();
const record = await getPlayerTeam(recordId);

const onCancel = () => {
  navigateTo(`/player-teams`);
};

const onSave = () => {
  navigateTo(`/player-teams`);
};
</script>

<template>
  <PlayerTeamForm v-model="record" @cancel="onCancel" @save="onSave" />
</template>
