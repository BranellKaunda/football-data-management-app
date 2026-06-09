<script setup>
const league = defineModel();
const draft = ref({ ...league.value });
const emit = defineEmits(["cancel", "save"]);

const { createLeague, editLeague } = useLeague();

async function save() {
  const body = {
    name: draft.value.name,
    season: draft.value.season,
    rank: draft.value.rank,
  };

  const res = league.value.id
    ? await editLeague(league.value.id, body)
    : await createLeague(body);

  league.value = res;
  emit("save", res);
}

function cancel() {
  draft.value = { ...league.value };
  emit("cancel");
}
</script>

<template>
  <h1 class="m-8 text-2xl font-bold text-center">
    {{ league.id ? "Edit League" : "Create League" }}
  </h1>
  <form
    class="flex flex-col gap-4 bg-white p-4 rounded shadow max-w-md mx-auto m-10"
    @submit.prevent="save"
  >
    <div class="flex flex-col gap-2">
      <label>Name</label>
      <input v-model="draft.name" placeholder="name" />
    </div>

    <div class="flex flex-col gap-2">
      <label>Season</label>
      <input v-model="draft.season" placeholder="season" />
    </div>

    <div class="flex flex-col gap-2">
      <label>Rank</label>
      <input v-model.number="draft.rank" placeholder="rank" />
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
