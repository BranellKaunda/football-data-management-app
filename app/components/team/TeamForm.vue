<script setup>
const team = defineModel();

// local working copy
const draft = ref({ ...team.value });
const emit = defineEmits(["cancel", "save"]);

const { createTeam, editTeam } = useTeam();

const authError = useState("authError");

async function save() {
  const body = {
    name: draft.value.name,
    location: draft.value.location,
    logo: draft.value.logo,
  };

  try {
    const res = team.value.id
      ? await editTeam(team.value.id, body)
      : await createTeam(body);

    team.value = res; // emit once
    emit("save", res);
  } catch (e) {
    if (e?.response?.status === 401) {
      authError.value = "You must be an Admin to perform this action.";
    }
  }
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
    class="card flex flex-col gap-4 p-6 max-w-md mx-auto m-4 sm:m-10"
    @submit.prevent="save"
  >
    <div class="flex flex-col gap-1.5">
      <label class="label">Name</label>
      <input v-model="draft.name" placeholder="e.g. Manchester United" class="input" />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Location</label>
      <input v-model="draft.location" placeholder="e.g. Manchester" class="input" />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Logo</label>
      <img
        v-if="team.logo"
        :src="team.logo"
        alt="Team Logo"
        class="w-14 h-14 object-contain rounded-full shadow-sm mb-2"
      />
      <PhotoUpload @handle-upload="onPhotoUpload" />
    </div>

    <div class="flex gap-3 justify-end pt-2">
      <button
        class="btn-secondary"
        type="button"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        class="btn-primary"
        type="submit"
      >
        Save
      </button>
    </div>
  </form>
</template>
