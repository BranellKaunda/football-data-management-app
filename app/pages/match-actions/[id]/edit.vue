<script setup>
const route = useRoute();
const matchActionId = route.params.id;
const { data: matchAction } = await useFetch(
  `http://localhost:8000/api/match-actions/${matchActionId}`,
);
const onCancel = () => {
  navigateTo(`/match-actions/${matchActionId}`);
};
const onSave = () => {
  navigateTo(`/match-actions/${matchActionId}`);
};
</script>
<template>
  <MatchActionForm v-model="matchAction" @cancel="onCancel" @save="onSave" />
</template>
