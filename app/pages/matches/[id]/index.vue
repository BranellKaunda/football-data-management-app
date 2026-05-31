<script setup>
const route = useRoute();

const id = Number(route.params.id);
const { data: match } = await useFetch(
  `http://localhost:8000/api/matches/${id}`,
  {
    query: route.query,
  },
);

const homeTeamId = computed(() => match.value?.homeTeam.id);
const awayTeamId = computed(() => match.value?.awayTeam.id);

const showSquadSelection = ref(false);

/* const homeTeamPlayersArray = computed(() => {
  return match.value?.players.filter(
    (player) => player.teamId === homeTeamId.value,
  );
});

const awayTeamPlayersArray = computed(() => {
  return match.value?.players.filter(
    (player) => player.teamId === awayTeamId.value,
  );
}); */

function onSelectionSaved(selectedIds) {
  console.log("Selected player IDs saved:", selectedIds);
  navigateTo(`/matches/${id}`);
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Match details</h1>

    <div v-if="match" class="bg-white p-4 rounded shadow flex flex-col gap-3">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 w-1/3">
          <NuxtLink :to="`/teams/${match.homeTeam.id}`">
            <img :src="match.homeTeam.logo" class="w-10 h-10 object-contain" />
          </NuxtLink>
          <NuxtLink
            :to="`/teams/${match.homeTeam.id}`"
            class="font-medium text-sm hover:text-blue-600"
          >
            {{ match.homeTeam.name }}
          </NuxtLink>
        </div>

        <div class="text-lg font-bold text-center w-1/3">
          {{ match.homeTeamGoals }}
          <span class="text-gray-500">vs</span>
          {{ match.awayTeamGoals }}
        </div>

        <div class="flex items-center justify-end gap-2 w-1/3">
          <NuxtLink
            :to="`/teams/${match.awayTeam.id}`"
            class="font-medium text-sm text-right hover:text-blue-600"
          >
            {{ match.awayTeam.name }}
          </NuxtLink>
          <NuxtLink :to="`/teams/${match.awayTeam.id}`">
            <img :src="match.awayTeam.logo" class="w-10 h-10 object-contain" />
          </NuxtLink>
        </div>
      </div>

      <div class="text-gray-600 text-sm text-center">
        {{ match.competition?.name }} • {{ match.matchDate }} •
        {{ match.status }}
      </div>

      <div class="text-gray-600 text-sm text-center">
        Referee: {{ match.referee?.firstName }}
        {{ match.referee?.lastName || "Referee not assigned" }}
      </div>

      <div class="text-center">
        <NuxtLink
          class="text-blue-600 hover:text-blue-800 text-sm"
          :to="`/matches/${match.id}/edit`"
        >
          Edit Match
        </NuxtLink>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Loading match...</div>
  </div>

  <div class="text-center">
    <button
      class="bg-white font-semibold text-black hover:text-green-700 py-2 px-4 rounded"
      @click="showSquadSelection = !showSquadSelection"
    >
      Submit Team Squads
    </button>
  </div>

  <div v-if="showSquadSelection" class="max-w-3xl mx-auto p-6">
    <NuxtLink :to="`/teams/${match.homeTeam.id}`" class="inline-block">
      <img :src="match.homeTeam.logo" class="w-10 h-10 object-contain" />
    </NuxtLink>
    <PlayerSelectionForMatch
      :teamId="homeTeamId"
      :matchId="id"
      @save="onSelectionSaved"
    />
  </div>

  <div v-if="showSquadSelection" class="max-w-3xl mx-auto p-6">
    <NuxtLink :to="`/teams/${match.awayTeam.id}`" class="inline-block">
      <img :src="match.awayTeam.logo" class="w-10 h-10 object-contain" />
    </NuxtLink>
    <PlayerSelectionForMatch
      :teamId="awayTeamId"
      :matchId="id"
      @save="onSelectionSaved"
    />
  </div>
</template>
