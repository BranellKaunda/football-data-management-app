<script setup>
const playerXmatch = ref({});
const onCancel = () => { navigateTo(`/playerXmatches`); };
const onSave = async (e) => { navigateTo(`/playerXmatches/${e.id}`); };
</script>
<template>
  <PlayerXmatchesForm v-model="playerXmatch" @cancel="onCancel" @save="onSave" />
</template>
