<script setup>
const props = defineProps({
  matchId: {
    type: Number,
    required: true,
  },
});

const { data } = await useFetch(
  `http://localhost:8000/api/match-actions/?matchId=${props.matchId}`,
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <MatchActionList :match-actions="data ?? []" />
  </div>
</template>
