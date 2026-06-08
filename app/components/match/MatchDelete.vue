<script setup>
const props = defineProps({
  matchId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["deleted"]);

async function deleteMatch() {
  const res = await $fetch(
    `http://localhost:8000/api/matches/${props.matchId}`,
    {
      method: "DELETE",
    },
  );

  emit("deleted");
}
</script>

<template>
  <button
    @click="deleteMatch"
    class="absolute bottom-2 right-6 hover:scale-110"
  >
    <img src="/delete-icon.png" alt="Delete" class="w-5 h-5" />
  </button>
</template>
