<script setup>
const players = ref({
  name: "branell",
  age: 27,
  number: 22,
});
</script>

<template>
  <div>
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/players">Players</NuxtLink></li>
        <li><NuxtLink to="/matches">Matches</NuxtLink></li>
        <li><NuxtLink to="/teams">Teams</NuxtLink></li>
        <li><NuxtLink to="/leagues">Leagues</NuxtLink></li>
      </ul>
    </nav>

    <NuxtPage />

    <!-- <TestChild v-model="players" /> -->
  </div>
</template>
