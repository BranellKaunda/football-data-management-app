<script setup>
const league = defineModel();

const draft = ref({ ...league.value });
const emit = defineEmits(["cancel", "save"]);

async function save() {
  const res = await $fetch(
    `http://localhost:8000/api/leagues/${league.value.id}`,
    {
      method: "PATCH",
      body: {
        name: draft.value.name,
        season: draft.value.season,
        rank: draft.value.rank,
      },
    },
  );

  league.value = res;
  emit("save");
}

function cancel() {
  draft.value = { ...league.value };
  emit("cancel");
}
</script>

<template>
  <form @submit.prevent="save">
    <input v-model="draft.name" placeholder="name" />
    <input v-model="draft.season" placeholder="season" />
    <input v-model.number="draft.rank" placeholder="rank" />
    <button type="button" @click="cancel">Cancel</button>
    <button type="submit">Save</button>
  </form>
</template>
