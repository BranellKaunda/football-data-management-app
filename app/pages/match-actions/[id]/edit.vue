<script setup>
const route = useRoute();
const matchActionId = route.params.id;
const { getMatchAction } = useMatchAction();
const matchAction = await getMatchAction(matchActionId);
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
