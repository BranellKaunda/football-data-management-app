<script setup>
const route = useRoute();
const leagueId = route.params.id;

const { data: league } = await useFetch(
  `http://localhost:8000/api/leagues/${leagueId}`,
);

const onCancel = () => {
  navigateTo(`/leagues`);
};

const onSave = (e) => {
  navigateTo(`/leagues/${e.id}`);
};
</script>

<template>
  <LeagueForm v-model="league" @cancel="onCancel" @save="onSave" />
</template>
