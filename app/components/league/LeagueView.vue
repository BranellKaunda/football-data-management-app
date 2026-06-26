<script setup>
import { authClient } from "@/lib/auth-client";

const session = authClient.useSession();

const props = defineProps({
  initialLeagueId: {
    type: Number,
    default: null,
  },
  initialLeague: {
    type: Object,
    default: null,
  },
});

const { getAllLeagues } = useLeague();
const { getMatchesByCompetition } = useMatch();

const leagues = await getAllLeagues();

const selectedName = ref("");
const selectedSeason = ref("");
const leagueMatches = ref([]);
const visibleCount = ref(20);

if (leagues?.length) {
  selectedName.value = leagues[0].name;
  const seasons = [...new Set(leagues.filter((l) => l.name === selectedName.value).map((l) => l.season))];
  selectedSeason.value = seasons[0] ?? "";
}

if (props.initialLeague) {
  selectedName.value = props.initialLeague.name;
  selectedSeason.value = props.initialLeague.season;
  leagueMatches.value = await getMatchesByCompetition(props.initialLeague.id);
} else if (props.initialLeagueId && leagues) {
  const league = leagues.find((l) => l.id === props.initialLeagueId);
  if (league) {
    selectedName.value = league.name;
    selectedSeason.value = league.season;
  }
}

const availableNames = computed(() => {
  if (!leagues) return [];
  return [...new Set(leagues.map((l) => l.name))];
});

const availableSeasons = computed(() => {
  if (!leagues || !selectedName.value) return [];
  return [...new Set(leagues.filter((l) => l.name === selectedName.value).map((l) => l.season))];
});

const matchedLeague = computed(() => {
  if (!leagues || !selectedName.value || !selectedSeason.value) return null;
  return (
    leagues.find(
      (l) => l.name === selectedName.value && l.season === selectedSeason.value,
    ) || null
  );
});

const visibleMatches = computed(() =>
  leagueMatches.value.slice(0, visibleCount.value),
);

const allLoaded = computed(
  () => visibleCount.value >= leagueMatches.value.length,
);

const showMoreMatches = () => {
  visibleCount.value += 20;
};

const activeTab = ref("matches");

watch(
  matchedLeague,
  async (league) => {
    visibleCount.value = 20;
    if (league) {
      if (!props.initialLeague || league.id !== props.initialLeague.id) {
        leagueMatches.value = await getMatchesByCompetition(league.id);
      }
    } else {
      leagueMatches.value = [];
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <div class="flex gap-4 mb-6">
      <NuxtLink
        v-if="session.data"
        class="inline-block px-4 py-2 font-semibold hover:text-blue-800"
        to="/leagues/create"
      >
        Create New League
      </NuxtLink>
      <NuxtLink
        v-if="session.data"
        class="inline-block px-4 py-2 font-semibold hover:text-blue-800"
        :to="`/matches/create`"
      >
        Create A Match
      </NuxtLink>

      <NuxtLink
        v-if="session.data"
        class="inline-block px-4 py-2 font-semibold hover:text-blue-800"
        :to="`/import/matches`"
      >
        Import Matches
      </NuxtLink>
    </div>

    <!-- INSTRUCTIONS FOR ADMIN-->
    <!-- <div class="text-gray-400 mb-6 font-normal">
      <h2 class="text-gray-400">INSTRUCTIONS</h2>
      <ol class="list-decimal list-inside">
        <li>Create a league.</li>
        <li>Import/create teams</li>
        <li>
          Create a match using the "Create A Match" link. Or import matches
          using a CSV file, format:
          date,home_team,away_team,home_goals,away_goals.
        </li>
      </ol>
    </div> -->

    <h1 class="text-lg font-bold mb-6 text-center">Competition</h1>

    <div class="grid grid-cols-1 gap-4">
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
            <option v-for="name in availableNames" :key="name" :value="name">
              {{ name }}
            </option>
          </select>

          <select
            v-model="selectedSeason"
            class="border rounded px-8 text-gray-600 text-sm mt-2"
          >
            <option
              v-for="season in availableSeasons"
              :key="season"
              :value="season"
            >
              {{ season }}
            </option>
          </select>

          <NuxtLink
            v-if="matchedLeague && session.data"
            :to="`/leagues/${matchedLeague.id}/edit`"
            class="text-blue-600 text-sm mt-2 hover:underline"
          >
            Edit League
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- TABS -->
  <div v-if="leagueMatches.length" class="max-w-3xl mx-auto px-6 flex border-b">
    <button
      @click="activeTab = 'matches'"
      class="px-6 py-3 text-sm font-semibold border-b-2 transition"
      :class="
        activeTab === 'matches'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      "
    >
      Matches
    </button>
    <button
      @click="activeTab = 'table'"
      class="px-6 py-3 text-sm font-semibold border-b-2 transition"
      :class="
        activeTab === 'table'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      "
    >
      League Table
    </button>
    <button
      @click="activeTab = 'form'"
      class="px-6 py-3 text-sm font-semibold border-b-2 transition"
      :class="
        activeTab === 'form'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      "
    >
      Form
    </button>
  </div>

  <!-- DYNAMIC CONTENT -->
  <MatchList
    v-if="activeTab === 'matches' && visibleMatches.length"
    :matches="visibleMatches"
  />
  <div
    v-if="activeTab === 'matches' && !allLoaded"
    class="max-w-3xl mx-auto px-6 text-center"
  >
    <button
      @click="showMoreMatches"
      class="text-blue-600 hover:text-blue-800 text-sm font-semibold underline"
    >
      Show more matches
    </button>
  </div>
  <LeagueTable
    v-if="activeTab === 'table' && leagueMatches.length"
    :matches="leagueMatches"
  />
  <LeagueForm
    v-if="activeTab === 'form' && leagueMatches.length"
    :matches="leagueMatches"
  />
</template>
