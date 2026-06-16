<script setup>
const props = defineProps({
  teamId: {
    type: Number,
    requred: true,
  },
  leagueId: {
    type: Number,
    requred: true,
  },
});

const { getLeague } = useLeague();
const { getPlayersByTeamAndYear } = usePlayer();

const players = ref(null);

watch(
  () => [props.teamId, props.leagueId],
  async () => {
    const league = await getLeague(props.leagueId);
    players.value = await getPlayersByTeamAndYear(props.teamId, league.season);
  },
  { immediate: true },
  //makes sure in also runs on mount
);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 shadow flex flex-col gap-2">
    <h1 class="text-lg font-semibold mb-6 text-center">Players</h1>

    <ol class="list-decimal list-inside" v-if="players.length > 0">
      <li
        class="hover:text-blue-600"
        v-for="player in players"
        :key="player.id"
      >
        <NuxtLink :to="`/players/${player.id}`">
          {{ player.player.firstName }} {{ player.player.lastName }}
        </NuxtLink>
      </li>
    </ol>

    <p v-else class="text-center text-gray-500">No players found</p>
  </div>
</template>
