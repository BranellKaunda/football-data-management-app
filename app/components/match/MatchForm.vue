<script setup>
import { createEmptyMatchForm } from "#shared/utils/Match";

const match = defineModel();
const draft = ref({ ...match.value });
const emit = defineEmits(["cancel", "save"]);

const { getTeams } = useTeam();
const teams = await getTeams();

const { data: referees } = await useFetch("http://localhost:8000/api/referees");
const { data: competitions } = await useFetch(
  "http://localhost:8000/api/leagues",
);

const { createMatch, editMatch } = useMatch();

async function save() {
  const body = {
    homeTeamId: draft.value.homeTeam.id,
    awayTeamId: draft.value.awayTeam.id,
    homeTeamGoals: draft.value.homeTeamGoals,
    awayTeamGoals: draft.value.awayTeamGoals,
    matchDate: draft.value.matchDate,
    status: draft.value.status,
    refereeId: draft.value.referee.id,
    competitionId: draft.value.competition.id,
  };

  const res = match.value.id
    ? await editMatch(match.value.id, body)
    : await createMatch(body);

  emit("save", res);
  draft.value = { ...createEmptyMatchForm() };
}

function cancel() {
  draft.value = { ...match.value };
  emit("cancel");
}
</script>

<template>
  <h1 class="m-8 text-2xl font-bold text-center">
    {{ match.id ? "Edit Match" : "Create Match" }}
  </h1>
  <form
    class="flex flex-col gap-4 bg-white p-4 rounded shadow max-w-md mx-auto m-10"
    @submit.prevent="save"
  >
    <div class="flex flex-col gap-2">
      <label>Home Team</label>
      <select v-model.number="draft.homeTeam.id" placeholder="select a team">
        <option disabled value="">Select a team</option>
        <option v-for="team in teams" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label>Away Team</label>
      <select v-model.number="draft.awayTeam.id" placeholder="select a team">
        <option disabled value="">Select a team</option>
        <option v-for="team in teams" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label>Home Team Goals</label>
      <input v-model.number="draft.homeTeamGoals" placeholder="homeTeamGoals" />
    </div>

    <div class="flex flex-col gap-2">
      <label>Away Team Goals</label>
      <input v-model.number="draft.awayTeamGoals" placeholder="awayTeamGoals" />
    </div>

    <div class="flex flex-col gap-2">
      <label>Match Date</label>
      <input v-model="draft.matchDate" placeholder="yyyy-mm-dd" />
    </div>

    <div class="flex flex-col gap-2">
      <label>Status</label>
      <select v-model="draft.status">
        <option value="Scheduled">Scheduled</option>
        <option value="Live">Live</option>
        <option value="Finished">Finished</option>
        <option value="Halftime">Halftime</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Abandoned">Abandoned</option>
      </select>
    </div>

    <div class="flex flex-col gap-2" v-if="referees">
      <label>Referee</label>
      <select v-model.number="draft.referee.id">
        <option disabled value="">Select a referee</option>
        <option
          v-for="referee in referees"
          :key="referee.id"
          :value="referee.id"
        >
          {{ referee.firstName }} {{ referee.lastName }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-2" v-if="competitions">
      <label> Competition</label>
      <select v-model.number="draft.competition.id">
        <option disabled value="">Select a competition</option>
        <option
          v-for="competition in competitions"
          :key="competition.id"
          :value="competition.id"
        >
          {{ competition.name }} {{ competition.season }}
        </option>
      </select>
    </div>

    <div class="flex gap-4 justify-end">
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
        type="button"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        type="submit"
      >
        Save
      </button>
    </div>
  </form>
</template>
