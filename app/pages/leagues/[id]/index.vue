<script setup>
const route = useRoute();
const leagueId = Number(route.params.id);

const { getLeague } = useLeague();
const league = await getLeague(leagueId);
</script>

<template>
  <LeagueView :initialLeague="league" />
</template>
