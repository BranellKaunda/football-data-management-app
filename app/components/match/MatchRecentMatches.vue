<script setup>
const props = defineProps({
  teamId: {
    type: Number,
    required: true,
  },
});

const { getMatchesByTeam } = useMatch();
const matches = await getMatchesByTeam(props.teamId);
</script>

<template>
  <MatchList :matches="matches" />
</template>
