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
  <div
    class="max-w-3xl mx-auto p-6 items-center gap-2 mb-4 bg-white p-4 rounded shadow"
  >
    <TeamLogo v-if="teamLogo && teamId" :teamLogo="teamLogo" :teamId="teamId" />
    <ol class="list-decimal list-inside">
      <li v-for="player in players" :key="player.id">
        {{ player.firstName }} {{ player.lastName }}
      </li>
    </ol>
  </div>
</template>
