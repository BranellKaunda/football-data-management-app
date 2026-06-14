<script setup>
const route = useRoute();
const teamId = Number(route.params.id);
</script>

<template>
  <TeamView :initialTeamId="teamId" />
</template>
