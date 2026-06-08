<script setup>
import MatchSummary from "~/components/match-action/MatchSummary.vue";
import { reloadNuxtApp } from "#app";

const route = useRoute();

const id = Number(route.params.id);
const { data: match, refresh } = await useFetch(
  `http://localhost:8000/api/matches/${id}`,
  {
    query: route.query,
  },
);

const homeTeamId = computed(() => match.value?.homeTeam.id);
const awayTeamId = computed(() => match.value?.awayTeam.id);

const homeTeamPlayersArray = computed(() => {
  return match.value?.players.filter(
    (player) => player.teamId === homeTeamId.value,
  );
});

const awayTeamPlayersArray = computed(() => {
  return match.value?.players.filter(
    (player) => player.teamId === awayTeamId.value,
  );
});

const homeTeamExistingPlayerIds = computed(() => {
  return homeTeamPlayersArray.value?.map((p) => p.id) ?? [];
});

const awayTeamExistingPlayerIds = computed(() => {
  return awayTeamPlayersArray.value?.map((p) => p.id) ?? [];
});

function onSelectionSaved(selectedIds) {
  // After saving the player selection, we can refresh the match data to get the updated players and their associations with the match.
  reloadNuxtApp();
  navigateTo(`/matches/${id}`);
}

/* Match Actions*/
const matchAction = ref({});
const onCancel = () => {
  navigateTo(`/matches/${id}`);
};

const onSave = async () => {
  //navigateTo(`/matches/${e.res.id}`);
  reloadNuxtApp();
};
</script>

<template>
  <Match :match="match" />

  <template v-if="match.status === 'Scheduled'">
    <h1 class="text-xl font-bold mb-4 text-center">
      Submit players for the match
    </h1>

    <div class="max-w-3xl mx-auto p-6">
      <TeamLogo :teamLogo="match.homeTeam.logo" :teamId="match.homeTeam.id" />
      <PlayerSelectionForMatch
        :teamId="homeTeamId"
        :matchId="id"
        :existingPlayerIds="homeTeamExistingPlayerIds"
        @save="onSelectionSaved"
      />
    </div>

    <div class="max-w-3xl mx-auto p-6">
      <TeamLogo :teamLogo="match.awayTeam.logo" :teamId="match.awayTeam.id" />
      <PlayerSelectionForMatch
        :teamId="awayTeamId"
        :matchId="id"
        :existingPlayerIds="awayTeamExistingPlayerIds"
        @save="onSelectionSaved"
      />
    </div>

    <!-- Create match actions -->
    <div class="max-w-3xl mx-auto p-6">
      <p class="text-center text-gray-600 mb-4">
        After submitting the players, you can create match actions such as
        goals, assists, and cards. These actions will be associated with the
        players you selected for this match. Match details will be revealed when
        a match status is "Finished".
      </p>
      <MatchActionForm
        v-model="matchAction"
        :matchId="id"
        @cancel="onCancel"
        @save="onSave"
      />
    </div>
  </template>

  <template v-else-if="match.status === 'Finished'">
    <div class="flex justify-between mb-4 max-w-3xl mx-auto gap-4">
      <div class="bg-white p-4">
        <PlayerInMatch
          :players="homeTeamPlayersArray"
          :teamLogo="match.homeTeam.logo"
          :teamId="match.homeTeam.id"
        />
      </div>

      <div class="bg-white p-4">
        <PlayerInMatch
          :players="awayTeamPlayersArray"
          :teamLogo="match.awayTeam.logo"
          :teamId="match.awayTeam.id"
        />
      </div>
    </div>

    <!-- MATCH SUMMARY -->
    <div class="max-w-3xl mx-auto p-6">
      <h2 class="text-xl font-bold mb-4 text-center">Match Summary</h2>
      <MatchSummary :match-id="match.id" />
    </div>
  </template>
</template>
