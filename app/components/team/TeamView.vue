<script setup>
const props = defineProps({
  initialTeamId: {
    type: Number,
    default: null,
  },
});

const { getAllTeams } = useTeam();
const teams = await getAllTeams();

const { getMatchesByTeamAndCompetition, getMatchesByCompetition } = useMatch();
const { getLeaguesByTeam } = useTeamXLeague();

const selectedTeamId = ref(null);
const selectedLeagueId = ref("");
const teamLeagues = ref([]);

if (teams?.length) {
  selectedTeamId.value = props.initialTeamId ?? teams[0].id;
}

async function loadTeamLeagues(teamId) {
  if (!teamId) {
    teamLeagues.value = [];
    return;
  }
  const records = await getLeaguesByTeam(teamId);
  teamLeagues.value = records.map((r) => r.league);
}

if (selectedTeamId.value) {
  await loadTeamLeagues(selectedTeamId.value);
}

const selectedTeam = computed(() => {
  if (!teams || !selectedTeamId.value) return null;
  return teams.find((t) => t.id === selectedTeamId.value) || null;
});

const teamMatches = ref([]);
const leagueMatches = ref([]);

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

const fetchLeagueMatches = async () => {
  if (!selectedLeagueId.value) {
    leagueMatches.value = [];
    return;
  }
  leagueMatches.value = await getMatchesByCompetition(
    Number(selectedLeagueId.value),
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
  await loadTeamLeagues(selectedTeamId.value);
});

watch(selectedLeagueId, async () => {
  visibleCount.value = 20;
  await Promise.all([fetchMatches(), fetchLeagueMatches()]);
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
            <!-- <option :value="null">Select a team</option> -->
            <option v-for="team in teams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>

          <select
            v-model="selectedLeagueId"
            class="border rounded px-8 text-gray-600 text-sm mt-2"
          >
            <option value="">Season</option>
            <option
              v-for="league in teamLeagues"
              :key="league.id"
              :value="league.id"
            >
              {{ selectedTeamId ? league.name : "" }} {{ league.season }}
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
  <div v-if="selectedTeamId" class="max-w-3xl mx-auto px-6 flex border-b">
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

    <button
      @click="activeTab = 'players'"
      class="px-6 py-3 text-sm font-semibold border-b-2 transition"
      :class="
        activeTab === 'players'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      "
    >
      Players
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
    v-if="activeTab === 'table' && selectedLeagueId && leagueMatches.length"
    :matches="leagueMatches"
    :highlightTeamId="selectedTeamId"
  />

  <LeagueForm
    v-if="activeTab === 'form' && selectedLeagueId && leagueMatches.length"
    :matches="leagueMatches"
    :highlightTeamId="selectedTeamId"
  />

  <PlayerList
    v-if="activeTab === 'players' && selectedLeagueId && selectedTeamId"
    :teamId="selectedTeamId"
    :leagueId="selectedLeagueId"
  />
</template>
