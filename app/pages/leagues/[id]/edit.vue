<script setup>
import LeagueForm from "~/components/league/LeagueForm.vue";

const route = useRoute();
const leagueId = route.params.id;

const { data: league } = await useFetch(
  `http://localhost:8000/api/leagues/${leagueId}`,
);

const onCancel = () => {
  navigateTo(`/leagues/${leagueId}`);
};

const onSave = () => {
  navigateTo("/leagues/");
};
</script>

<template>
  <LeagueForm v-model="league" @cancel="onCancel" @save="onSave" />
</template>
