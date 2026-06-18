<script setup>
const record = ref({});

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
