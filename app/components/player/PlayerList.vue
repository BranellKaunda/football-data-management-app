<script setup>
const props = defineProps({
  teamId: {
    type: Number,
    requred: false,
  },
});

const { getPlayersByTeam, getAllPlayers } = usePlayer();

const players = props.teamId
  ? await getPlayersByTeam(props.teamId)
  : await getAllPlayers();
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 shadow flex flex-col gap-2">
    <h1 class="font-bold">Players</h1>
    <ol class="list-decimal list-inside" v-if="players">
      <li
        class="hover:text-blue-600"
        v-for="player in players"
        :key="player.id"
      >
        <NuxtLink :to="`/players/${player.id}`">
          {{ player.firstName }} {{ player.lastName }}
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>
