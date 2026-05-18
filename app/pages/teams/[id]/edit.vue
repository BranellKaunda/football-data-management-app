<script setup>
const route = useRoute();
const teamId = route.params.id;

const { data: team } = await useFetch(
  `http://localhost:8000/api/teams/${teamId}`,
);

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
