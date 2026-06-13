<script setup>
const props = defineProps({
  initialTeamId: {
    type: Number,
    default: null,
  },
});

const { getAllTeams } = useTeam();
const teams = await getAllTeams();

const { getAllLeagues } = useLeague();
const leagues = await getAllLeagues();

const { getMatchesByTeamAndCompetition } = useMatch();

const selectedTeamId = ref(null);
const selectedLeagueId = ref("");

if (props.initialTeamId && teams) {
  selectedTeamId.value = props.initialTeamId;
}

const selectedTeam = computed(() => {
  if (!teams || !selectedTeamId.value) return null;
  return teams.find((t) => t.id === selectedTeamId.value) || null;
});

const teamMatches = ref([]);

const fetchMatches = async () => {
  if (!selectedTeamId.value) {
    teamMatches.value = [];
    return;
  }
  teamMatches.value = await getMatchesByTeamAndCompetition(
    selectedTeamId.value,
    selectedLeagueId.value ? Number(selectedLeagueId.value) : undefined,
  );
};

const visibleCount = ref(20);

const visibleMatches = computed(() =>
  teamMatches.value.slice(0, visibleCount.value),
);

const allLoaded = computed(
  () => visibleCount.value >= teamMatches.value.length,
);

const showMoreMatches = () => {
  visibleCount.value += 20;
};

const activeTab = ref("matches");

watch(selectedTeamId, async () => {
  visibleCount.value = 20;
  selectedLeagueId.value = "";
});

watch(selectedLeagueId, async () => {
  visibleCount.value = 20;
  await fetchMatches();
});
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <NuxtLink
      class="inline-block mb-6 px-4 py-2 font-semibold hover:text-blue-800"
      to="/teams/create"
    >
      Register Team
    </NuxtLink>

    <NuxtLink
      class="inline-block mb-6 px-4 py-2 font-semibold hover:text-blue-800"
      to="/import/teams"
    >
      Import Teams
    </NuxtLink>

    <h1 class="text-lg font-bold mb-6 text-center">Team</h1>

    <div class="grid grid-cols-1 gap-4">
      <div class="bg-white p-8 rounded shadow flex items-center gap-6">
        <TeamLogo
          v-if="selectedTeam"
          :teamLogo="selectedTeam.logo"
          :teamId="selectedTeam.id"
          size="w-18 h-18"
        />
        <div
          v-else
          class="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs"
        >
          Logo
        </div>

        <div class="flex flex-col">
          <select
            v-model="selectedTeamId"
            class="border rounded px-8 font-semibold text-sm"
          >
            <option :value="null">Select a team</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>

          <select
            v-model="selectedLeagueId"
            class="border rounded px-8 text-gray-600 text-sm mt-2"
          >
            <option value="">All leagues</option>
            <option
              v-for="league in leagues"
              :key="league.id"
              :value="league.id"
            >
              {{ league.season }}
            </option>
          </select>

          <NuxtLink
            v-if="selectedTeam"
            :to="`/teams/${selectedTeam.id}/edit`"
            class="text-blue-600 text-sm mt-2 hover:underline"
          >
            Edit Team
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- TABS -->
  <div v-if="teamMatches.length" class="max-w-3xl mx-auto px-6 flex border-b">
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
    v-if="activeTab === 'table' && teamMatches.length"
    :matches="teamMatches"
    :highlightTeamId="selectedTeamId"
  />
  <LeagueForm
    v-if="activeTab === 'form' && teamMatches.length"
    :matches="teamMatches"
    :highlightTeamId="selectedTeamId"
  />
</template>
