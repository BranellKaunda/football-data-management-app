<script setup>
const props = defineProps({
  teamId: {
    type: Number,
    required: true,
  },
  matchId: {
    type: Number,
    required: true,
  },
  existingPlayerIds: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["save"]);

const { data: players } = await useFetch(
  `http://localhost:8000/api/players/?teamId=${props.teamId}`,
);

const newPlayerIds = ref([]);

function isExisting(playerId) {
  return props.existingPlayerIds.includes(playerId);
}

function togglePlayer(playerId) {
  if (isExisting(playerId)) return;

  const idx = newPlayerIds.value.indexOf(playerId);
  if (idx === -1) {
    newPlayerIds.value.push(playerId);
  } else {
    newPlayerIds.value.splice(idx, 1);
  }
}

async function save() {
  if (newPlayerIds.value.length === 0) return;

  const promises = newPlayerIds.value.map((playerId) =>
    $fetch("http://localhost:8000/api/player-x-matches/create", {
      method: "POST",
      body: { playerId, matchId: props.matchId },
    }),
  );

  await Promise.all(promises);
  emit("save", [...newPlayerIds.value]);
}
</script>

<template>
  <form
    class="flex flex-col gap-2 bg-white p-4 rounded shadow"
    @submit.prevent="save"
  >
    <template v-if="players && players.length">
      <div
        v-for="player in players"
        :key="player.id"
        class="flex items-center gap-2"
      >
        <input
          type="checkbox"
          :id="`player-${player.id}`"
          :value="player.id"
          :checked="isExisting(player.id) || newPlayerIds.includes(player.id)"
          :disabled="isExisting(player.id)"
          @change="togglePlayer(player.id)"
        />
        <label
          :for="`player-${player.id}`"
          :class="{ 'text-gray-400': isExisting(player.id) }"
        >
          {{ player.firstName }} {{ player.lastName }}
          <span v-if="isExisting(player.id)" class="text-xs text-gray-400 ml-1">
            (already added)
          </span>
        </label>
      </div>
      <div class="flex gap-4 justify-end mt-2">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          :disabled="newPlayerIds.length === 0"
        >
          Save Selection
        </button>
      </div>
    </template>
    <p v-else class="text-gray-500 text-sm">Player data not available</p>
  </form>
</template>
