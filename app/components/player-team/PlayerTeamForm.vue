<script setup>
const record = defineModel();
const draft = ref({
  ...record.value,
  playerId: record.value.playerId ?? record.value.player?.id,
  teamId: record.value.teamId ?? record.value.team?.id,
});
const emit = defineEmits(["cancel", "save"]);
const editing = computed(() => !!draft.value.id);

const { getAllPlayers } = usePlayer();
const { getAllTeams } = useTeam();
const { assignPlayerToTeam, updatePlayerTeam } = usePlayerTeam();

const players = await getAllPlayers();
const teams = await getAllTeams();

const authError = useState("authError");

async function save() {
  const body = {
    teamId: draft.value.teamId,
    startDate: draft.value.startDate,
    endDate: draft.value.endDate || undefined,
    transfer: draft.value.transfer ?? false,
    loan: draft.value.loan ?? false,
  };

  try {
    if (editing.value) {
      await updatePlayerTeam(record.value.id, body);
    } else {
      body.playerId = draft.value.playerId;
      await assignPlayerToTeam(body);
    }

    emit("save");
  } catch (e) {
    if (e?.response?.status === 401) {
      authError.value = "You must be an Admin to perform this action.";
    }
  }
}

function cancel() {
  draft.value = {
    ...record.value,
    playerId: record.value.playerId ?? record.value.player?.id,
    teamId: record.value.teamId ?? record.value.team?.id,
  };
  emit("cancel");
}
</script>

<template>
  <h1 class="m-8 text-2xl font-bold text-center">
    {{ editing ? "Edit Player Team" : "Assign Player to Team" }}
  </h1>

  <form
    class="flex flex-col gap-4 bg-white p-4 rounded shadow max-w-md mx-auto m-10"
    @submit.prevent="save"
  >
    <div class="flex flex-col gap-2">
      <label>Player</label>
      <select v-if="!editing" v-model.number="draft.playerId">
        <option disabled value="">Select a player</option>
        <option v-for="player in players" :key="player.id" :value="player.id">
          {{ player.firstName }} {{ player.lastName }}
        </option>
      </select>
      <p v-else class="text-gray-700">
        {{ draft.player?.firstName }} {{ draft.player?.lastName }}
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <label>Team</label>
      <select v-model.number="draft.teamId">
        <option disabled value="">Select a team</option>
        <option v-for="team in teams" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label>Start Date</label>
      <input v-model="draft.startDate" placeholder="yyyy-mm-dd" />
    </div>

    <div class="flex flex-col gap-2">
      <label>End Date</label>
      <input v-model="draft.endDate" placeholder="yyyy-mm-dd" />
    </div>

    <fieldset class="flex gap-6">
      <div class="flex items-center gap-2">
        <input id="transfer" v-model="draft.transfer" type="checkbox" />
        <label for="transfer">Transfer</label>
      </div>

      <div class="flex items-center gap-2">
        <input id="loan" v-model="draft.loan" type="checkbox" />
        <label for="loan">Loan</label>
      </div>
    </fieldset>

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
