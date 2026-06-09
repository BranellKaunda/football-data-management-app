<script setup>
const route = useRoute();
const teamId = route.params.id;

const { getTeam } = useTeam();
const team = await getTeam(teamId);

const onCancel = () => {
  navigateTo(`/teams/${teamId}`);
};

const onSave = () => {
  navigateTo(`/teams/${teamId}`);
};
</script>

<template>
  <TeamForm v-model="team" @cancel="onCancel" @save="onSave" />
</template>
