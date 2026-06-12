<script setup>
const { getAllLeagues } = useLeague();
const leagues = await getAllLeagues();

const { getMatchesByCompetition } = useMatch();

const selectedName = ref("");
const selectedSeason = ref("");

const availableNames = computed(() => {
  if (!leagues) return [];
  let filtered = leagues;
  if (selectedSeason.value) {
    filtered = filtered.filter((l) => l.season === selectedSeason.value);
  }
  return [...new Set(filtered.map((l) => l.name))];
});

const availableSeasons = computed(() => {
  if (!leagues) return [];
  let filtered = leagues;
  if (selectedName.value) {
    filtered = filtered.filter((l) => l.name === selectedName.value);
  }
  return [...new Set(filtered.map((l) => l.season))];
});

const matchedLeague = computed(() => {
  if (!leagues || !selectedName.value || !selectedSeason.value) return null;
  return (
    leagues.find(
      (l) => l.name === selectedName.value && l.season === selectedSeason.value,
    ) || null
  );
});

const leagueMatches = ref([]);

watch(matchedLeague, async (league) => {
  if (league) {
    leagueMatches.value = await getMatchesByCompetition(league.id);
  } else {
    leagueMatches.value = [];
  }
});
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <NuxtLink
      class="inline-block mb-6 px-4 py-2 font-semibold hover:text-blue-800"
      to="/leagues/create"
    >
      Create New League
    </NuxtLink>

    <h1 class="text-2xl font-bold mb-6 text-center">Competition</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="bg-white p-8 rounded shadow flex items-center gap-6">
        <!-- LEAGUE LOGO -->
        <NuxtLink v-if="matchedLeague" :to="`/leagues/${matchedLeague.id}`">
          <img
            :src="matchedLeague.logo"
            alt="league logo"
            class="w-24 h-24 object-contain rounded"
          />
        </NuxtLink>
        <div
          v-else
          class="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs"
        >
          Logo
        </div>

        <!-- LEAGUE INFO -->
        <div class="flex flex-col">
          <select
            v-model="selectedName"
            class="border rounded px-8 font-semibold text-sm"
          >
            <option value="">Select a league</option>
            <option v-for="name in availableNames" :key="name" :value="name">
              {{ name }}
            </option>
          </select>

          <select
            v-model="selectedSeason"
            class="border rounded px-8 text-gray-600 text-sm mt-2"
          >
            <option value="">Select a season</option>
            <option
              v-for="season in availableSeasons"
              :key="season"
              :value="season"
            >
              {{ season }}
            </option>
          </select>

          <NuxtLink
            v-if="matchedLeague"
            :to="`/leagues/${matchedLeague.id}/edit`"
            class="text-blue-600 text-sm mt-2 hover:underline"
          >
            Edit League
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- MATCHES -->
  <MatchList v-if="leagueMatches.length" :matches="leagueMatches" />
</template>
