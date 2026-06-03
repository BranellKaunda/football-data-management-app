<script setup>
const matchAction = defineModel();
const draft = ref({ ...matchAction.value });
const emit = defineEmits(["cancel", "save"]);

const { data: matches } = await useFetch("http://localhost:8000/api/matches");
const { data: players } = await useFetch("http://localhost:8000/api/players");
const { data: teams } = await useFetch("http://localhost:8000/api/teams");

async function save() {
  const body = {
    matchId: draft.value.matchId,
    playerId: draft.value.playerId,
    playerIdExtra: draft.value.playerIdExtra,
    teamId: draft.value.teamId,
    action: draft.value.action,
    minute: draft.value.minute,
  };

  const method = matchAction.value.id ? "PATCH" : "POST";
  const url = matchAction.value.id
    ? "http://localhost:8000/api/match-actions/edit"
    : "http://localhost:8000/api/match-actions/create";

  if (matchAction.value.id) {
    body.id = matchAction.value.id;
  }

  const res = await $fetch(url, { method, body });

  matchAction.value = res;
  console.log("Saved match action:", res);
  emit("save", res);
}

function cancel() {
  draft.value = { ...matchAction.value };
  emit("cancel");
}
</script>

<template>
  <h1 class="m-8 text-2xl font-bold text-center">
    {{ matchAction.id ? "Edit Match Action" : "Create Match Action" }}
  </h1>
  <form
    class="flex flex-col gap-4 bg-white p-4 rounded shadow max-w-md mx-auto m-10"
    @submit.prevent="save"
  >
    <div class="flex flex-col gap-2">
      <label>Match</label>
      <select v-model.number="draft.matchId">
        <option disabled value="">Select a match</option>
        <option v-for="match in matches" :key="match.id" :value="match.id">
          Match #{{ match.id }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label>Player</label>
      <select v-model.number="draft.playerId">
        <option disabled value="">Select a player</option>
        <option v-for="player in players" :key="player.id" :value="player.id">
          {{ player.firstName }} {{ player.lastName }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label>Action</label>
      <select v-model="draft.action">
        <option disabled value="">Select action</option>
        <option value="Goal">Goal</option>
        <option value="Yellow Card">Yellow Card</option>
        <option value="Red Card">Red Card</option>
        <option value="Substitution">Substitution</option>
        <option value="Foul">Foul</option>
        <option value="Offside">Offside</option>
        <option value="Penalty">Penalty</option>
        <option value="Own Goal">Own Goal</option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label>Team</label>
      <select v-model.number="draft.teamId">
        <option disabled value="">Select a team</option>
        <option v-for="team in teams" :key="team.id" :value="team.id || null">
          {{ team.name }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label>Minute</label>
      <input v-model.number="draft.minute" type="number" placeholder="minute" />
    </div>

    <div class="flex flex-col gap-2">
      <label>Extra Player (e.g. substitution coming in)</label>
      <select v-model="draft.playerIdExtra">
        <option :value="null">None</option>
        <option
          v-for="player in players"
          :key="player.id"
          :value="player.id || null"
        >
          {{ player.firstName }} {{ player.lastName }}
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
