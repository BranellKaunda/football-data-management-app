<script setup>
const league = defineModel();
const draft = ref({ ...league.value });
const emit = defineEmits(["cancel", "save"]);

const { createLeague, editLeague } = useLeague();

const authError = useState("authError");

async function save() {
  const body = {
    name: draft.value.name,
    season: draft.value.season,
    rank: draft.value.rank,
  };

  try {
    const res = league.value.id
      ? await editLeague(league.value.id, body)
      : await createLeague(body);

    league.value = res;
    emit("save", res);
  } catch (e) {
    if (e?.response?.status === 401) {
      authError.value = "You must be an Admin to perform this action.";
    }
  }
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
    class="card flex flex-col gap-4 p-6 max-w-md mx-auto m-4 sm:m-10"
    @submit.prevent="save"
  >
    <div class="flex flex-col gap-1.5">
      <label class="label">Name</label>
      <input v-model="draft.name" placeholder="e.g. Premier League" class="input" />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Season</label>
      <input v-model="draft.season" placeholder="e.g. 2024/2025" class="input" />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Rank</label>
      <input v-model.number="draft.rank" placeholder="e.g. 1" class="input" />
    </div>

    <div class="flex gap-3 justify-end pt-2">
      <button class="btn-secondary" type="button" @click="cancel">Cancel</button>
      <button class="btn-primary" type="submit">Save</button>
    </div>
  </form>
</template>
