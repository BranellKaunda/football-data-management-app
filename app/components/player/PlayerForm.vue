<script setup>
const player = defineModel();
const draft = ref({ ...player.value });
const emit = defineEmits(["cancel", "save"]);

async function save() {
  const res = await $fetch(
    `http://localhost:8000/api/players/${player.value.id}`,
    {
      method: "PATCH",
      body: {
        teamId: draft.value.teamId,
        firstName: draft.value.firstName,
        lastName: draft.value.lastName,
        dob: draft.value.dob,
        position: draft.value.position,
      },
    },
  );

  player.value = res; // emit once
  emit("save");
}

function cancel() {
  draft.value = { ...player.value };
  emit("cancel");
}
</script>

<template>
  <form @submit.prevent="save">
    <input v-model.number="draft.teamId" placeholder="teamId" />
    <input v-model="draft.firstName" placeholder="firstName" />
    <input v-model="draft.lastName" placeholder="lastName" />
    <input v-model="draft.dob" placeholder="dob" />
    <input v-model="draft.position" placeholder="position" />
    <button type="button" @click="cancel">Cancel</button>
    <button type="submit">Save</button>
  </form>

  <pre>{{ draft }}</pre>
</template>
