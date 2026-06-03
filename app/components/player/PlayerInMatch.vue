<script setup>
const props = defineProps({
  players: {
    type: Array,
    required: true,
  },
  teamLogo: {
    type: String,
    required: false,
  },
  teamId: {
    type: Number,
    required: false,
  },
});
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">Players</h2>
    <div class="flex flex-col gap-3">
      <ol class="list-decimal list-inside">
        <li v-for="player in players" :key="player.id">
          {{ player.firstName }} {{ player.lastName }}
        </li>
      </ol>
    </div>
  </div>
</template>
