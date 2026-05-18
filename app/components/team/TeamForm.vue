<script setup>
const team = defineModel();

// local working copy
const draft = ref({ ...team.value });
const emit = defineEmits(["cancel", "save"]);

async function save() {
  const body = {
    name: draft.value.name,
    logo: draft.value.logo,
    location: draft.value.location,
  };

  const url = team.value.id
    ? `http://localhost:8000/api/teams/${team.value.id}`
    : `http://localhost:8000/api/teams/create`;

  const method = team.value.id ? "PATCH" : "POST";

  const res = await $fetch(url, {
    method,
    body,
  });

  team.value = res; // emit once
  emit("save", res);
}

function cancel() {
  draft.value = { ...team.value };
  emit("cancel");
}

function onPhotoUpload(url) {
  draft.value.logo = url;
}
</script>

<template>
  <h1 class="m-8 text-2xl font-bold text-center">
    {{ team.id ? "Edit Team" : "Register Team" }}
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
      <label>Location</label>
      <input v-model="draft.location" placeholder="location" />
    </div>

    <div class="flex flex-col gap-2">
      <label>Logo</label>
      <img
        v-if="team.logo"
        :src="team.logo"
        alt="Team Logo"
        class="w-14 h-14 object-contain rounded-full shadow mb-2"
      />
      <PhotoUpload @handle-upload="onPhotoUpload" />
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
