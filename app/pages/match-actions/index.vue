<script setup>
const { getAllMatchActions } = useMatchAction();
const matchActions = await getAllMatchActions();
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <NuxtLink
      to="/match-actions/create"
      class="btn-primary mb-4"
    >
      Create Match Action
    </NuxtLink>
    <h1 class="text-2xl font-bold mb-6 text-center">Match Actions</h1>
    <MatchActionList :match-actions="matchActions" />
  </div>
</template>
