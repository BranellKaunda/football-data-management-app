<script setup>
const props = defineProps({
  teamId: {
    type: Number,
    required: true,
  },
});

const { data } = await useFetch(
  `http://localhost:8000/api/matches/?teamId=${props.teamId}`,
);
</script>

<template>
  <MatchList :matches="data" />
</template>
