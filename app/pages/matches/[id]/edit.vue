<script setup>
const route = useRoute();
const matchId = route.params.id;

const { getMatch } = useMatch();
const match = await getMatch(matchId);

const onCancel = () => {
  navigateTo(`/leagues/${match.competition.id}`);
};

const onSave = () => {
  navigateTo(`/leagues/${match.competition.id}`);
};
</script>

<template>
  <MatchForm v-model="match" @cancel="onCancel" @save="onSave" />
</template>
