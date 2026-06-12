<script setup>
const route = useRoute();
const leagueId = Number(route.params.id);
</script>

<template>
  <LeagueView :initialLeagueId="leagueId" />
</template>
