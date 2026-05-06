<script setup>
const team = defineModel();

// local working copy
const draft = ref({ ...team.value });

async function save() {
  team.value = { ...draft.value }; // emit once
  await $fetch(`http://localhost:8000/api/teams/${team.value.id}`, {
    method: "PATCH",
    body: {
      name: team.value.name,
      logo: team.value.logo,
      location: team.value.location,
    },
  });
}

const emit = defineEmits(['cancel'])

function cancel() {
  draft.value = { ...team.value };
  emit('cancel');
}
</script>

<template>
  <form @submit.prevent="save">
    <input v-model="draft.name" placeholder="name" />
    <input v-model="draft.logo" placeholder="logo" />
    <input v-model="draft.location" placeholder="location" />
    <button type="button" @click="cancel">Cancel</button>
    <button type="submit">Save</button>
  </form>
</template>
