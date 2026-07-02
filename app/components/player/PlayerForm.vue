<script setup>
const player = defineModel();
const draft = ref({ ...player.value });
const emit = defineEmits(["cancel", "save"]);
const editing = computed(() => !!draft.value.id);

const { getAllTeams } = useTeam();
const teams = await getAllTeams();

const { createPlayer, editPlayer } = usePlayer();

const authError = useState("authError");

async function save() {
  const body = {
    firstName: draft.value.firstName,
    lastName: draft.value.lastName,
    dob: draft.value.dob,
    position: draft.value.position,
    weightKg: draft.value.weightKg,
    heightCm: draft.value.heightCm,
  };

  try {
    const res = editing.value
      ? await editPlayer(player.value.id, body)
      : await createPlayer(body);

    player.value = res;
    emit("save", res);
  } catch (e) {
    if (e?.response?.status === 401) {
      authError.value = "You must be an Admin to perform this action.";
    }
  }
}

function cancel() {
  draft.value = { ...player.value };
  emit("cancel");
}
</script>

<template>
  <h1 class="m-8 text-2xl font-bold text-center">
    {{ editing ? "Edit Player" : "Register Player" }}
  </h1>

  <form
    class="card flex flex-col gap-4 p-6 max-w-md mx-auto m-4 sm:m-10"
    @submit.prevent="save"
  >
    <div class="flex flex-col gap-1.5">
      <label class="label">First name</label>
      <input v-model="draft.firstName" placeholder="e.g. Cristiano" class="input" />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Last name</label>
      <input v-model="draft.lastName" placeholder="e.g. Ronaldo" class="input" />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Date of Birth</label>
      <input v-model="draft.dob" placeholder="yyyy-mm-dd" class="input" />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Position</label>
      <select v-model="draft.position" class="select">
        <option disabled value="">Select a position</option>
        <option value="Forward">Forward</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Defender">Defender</option>
        <option value="Goalkeeper">Goalkeeper</option>
      </select>
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Weight (kg)</label>
      <input v-model.number="draft.weightKg" placeholder="e.g. 85" class="input" />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="label">Height (cm)</label>
      <input v-model.number="draft.heightCm" placeholder="e.g. 187" class="input" />
    </div>

    <div class="flex gap-3 justify-end pt-2">
      <button class="btn-secondary" type="button" @click="cancel">Cancel</button>
      <button class="btn-primary" type="submit">Save</button>
    </div>
  </form>
</template>
