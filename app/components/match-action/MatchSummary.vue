<script setup>
const props = defineProps({
  matchId: {
    type: Number,
    required: true,
  },
});

const { getMatchActionsByMatch } = useMatchAction();
const matchActions = await getMatchActionsByMatch(props.matchId);
</script>

<template>
  <div class="flex flex-col gap-2">
    <MatchActionList :match-actions="matchActions ?? []" />
  </div>
</template>
