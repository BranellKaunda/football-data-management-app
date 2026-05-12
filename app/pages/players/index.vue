<script setup>
const { data: players } = await useFetch("http://localhost:8000/api/players");
</script>

<template>
  <ol v-if="players">
    <li v-for="player in players">
      <p>{{ player.firstName }} {{ player.lastName }}</p>
      <NuxtLink :to="`/players/${player.id}`">Player details</NuxtLink>
    </li>
  </ol>
</template>
