<script setup>
const route = useRoute();

const { data: player } = await useFetch(
  `http://localhost:8000/api/players/${route.params.id}`,
  {
    query: route.query,
  },
);
</script>

<template>
  <pre>{{ player }}</pre>
  <NuxtLink :to="`/players/${player.id}/edit`">Edit player</NuxtLink>
</template>
