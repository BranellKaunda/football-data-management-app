<script setup>
const matchAction = ref({});
const onCancel = () => { navigateTo("/match-actions"); };
const onSave = async (e) => { navigateTo(`/match-actions/${e.id}`); };
</script>
<template>
  <MatchActionForm v-model="matchAction" @cancel="onCancel" @save="onSave" />
</template>
