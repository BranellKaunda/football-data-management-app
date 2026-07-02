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
    class="card flex flex-col gap-4 p-6 max-w-md mx-auto m-4 sm:m-10"
    @submit.prevent="save"
  >
    <div class="flex flex-col gap-1.5">
      <label class="label">Player</label>
      <select v-if="!editing" v-model.number="draft.playerId" class="select">
        <option disabled value="">Select a player</option>
        <option v-for="player in players" :key="player.id" :value="player.id">
          {{ player.firstName }} {{ player.lastName }}
        </option>
      </select>
      <p v-else class="text-sm text-slate-600 font-medium">
        {{ draft.player?.firstName }} {{ draft.player?.lastName }}
      </p>
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Team</label>
      <select v-model.number="draft.teamId" class="select">
        <option disabled value="">Select a team</option>
        <option v-for="team in teams" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Start Date</label>
      <input v-model="draft.startDate" placeholder="yyyy-mm-dd" class="input" />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">End Date</label>
      <input v-model="draft.endDate" placeholder="yyyy-mm-dd" class="input" />
    </div>

    <fieldset class="flex gap-6 pt-1">
      <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
        <input id="transfer" v-model="draft.transfer" type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
        <span>Transfer</span>
      </label>

      <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
        <input id="loan" v-model="draft.loan" type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
        <span>Loan</span>
      </label>
    </fieldset>

    <div class="flex gap-3 justify-end pt-2">
      <button class="btn-secondary" type="button" @click="cancel">Cancel</button>
      <button class="btn-primary" type="submit">Save</button>
    </div>
  </form>
</template>
