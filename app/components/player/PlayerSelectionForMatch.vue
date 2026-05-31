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
});

const emit = defineEmits(["save"]);

const { data: players } = await useFetch(
  `http://localhost:8000/api/players/?teamId=${props.teamId}`,
);

const selectedPlayerIds = ref([]);

function togglePlayer(playerId) {
  const idx = selectedPlayerIds.value.indexOf(playerId);
  if (idx === -1) {
    selectedPlayerIds.value.push(playerId);
  } else {
    selectedPlayerIds.value.splice(idx, 1);
  }
}

async function save() {
  const promises = selectedPlayerIds.value.map((playerId) =>
    $fetch("http://localhost:8000/api/player-x-matches/create", {
      method: "POST",
      body: { playerId, matchId: props.matchId },
    }),
  );

  await Promise.all(promises);
  emit("save", [...selectedPlayerIds.value]);
}
</script>

<template>
  <form
    class="flex flex-col gap-2 bg-white p-4 rounded shadow"
    @submit.prevent="save"
  >
    <div v-for="player in players" :key="player.id" class="flex items-center gap-2">
      <input
        type="checkbox"
        :id="`player-${player.id}`"
        :value="player.id"
        :checked="selectedPlayerIds.includes(player.id)"
        @change="togglePlayer(player.id)"
      />
      <label :for="`player-${player.id}`">
        {{ player.firstName }} {{ player.lastName }}
      </label>
    </div>
    <div class="flex gap-4 justify-end mt-2">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Save Selection
      </button>
    </div>
  </form>
</template>
