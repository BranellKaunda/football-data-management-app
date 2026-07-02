<script setup>
import { createEmptyMatchActions } from "#shared/utils/Match";

const props = defineProps({
  matchId: {
    type: Number,
    required: true,
  },
});
const matchAction = defineModel();
const draft = ref({ ...matchAction.value });
const emit = defineEmits(["cancel", "save"]);

const { getMatch } = useMatch();
const match = await getMatch(props.matchId);

const players = computed(() => {
  return match?.players || [];
});

const teams = computed(() => {
  const teamArray = [];

  match?.homeTeam && teamArray.push(match.homeTeam);
  match?.awayTeam && teamArray.push(match.awayTeam);

  return teamArray;
});

const { createMatchAction, editMatchAction } = useMatchAction();

const authError = useState("authError");

async function save() {
  const body = {
    matchId: props.matchId,
    playerId: draft.value.playerId,
    playerIdExtra: draft.value.playerIdExtra,
    teamId: draft.value.teamId,
    action: draft.value.action,
    minute: draft.value.minute,
  };

  if (matchAction.value.id) {
    body.id = matchAction.value.id;
  }

  try {
    const res = matchAction.value.id
      ? await editMatchAction(body)
      : await createMatchAction(body);

    matchAction.value = res;

    emit("save", res);
    draft.value = { ...createEmptyMatchActions(props.matchId) };
  } catch (e) {
    if (e?.response?.status === 401) {
      authError.value = "You must be an Admin to perform this action.";
    }
  }
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
    class="flex flex-col gap-4 bg-white p-4 rounded shadow max-w-md mx-auto m-4 sm:m-10"
    @submit.prevent="save"
  >
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
