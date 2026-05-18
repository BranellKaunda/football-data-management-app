<script setup>
const team = ref({});

function onCancel(e) {
  navigateTo("/teams");
}

function onSave(e) {
  navigateTo(`/teams/${e.id}`);
}
</script>

<template>
  <TeamForm v-model="team" @cancel="onCancel" @save="onSave" />
</template>
