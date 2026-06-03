<script setup>
const props = defineProps({
  matchAction: {
    type: Object,
    required: true,
  },
  size: {
    type: Number,
    default: 24,
  },
});

const imageMap = {
  Goal: "/goal.png",
  "Yellow Card": "/yellow-card.png",
  "Red Card": "/red-card.png",
  Substitution: "/substitution.png",
  Foul: "/foul.png",
  Offside: "/offside.png",
  Penalty: "/penalty.png",
  "Own Goal": "/own-goal.png",
};

const imageSrc = computed(() => imageMap[props.matchAction.action]);
</script>

<template>
  <div class="flex items-center gap-2">
    <img
      v-if="imageSrc"
      :src="imageSrc"
      :width="size"
      :height="size"
      class="shrink-0"
      :alt="matchAction.action"
    />
    <span class="font-medium tabular-nums">{{ matchAction.minute }}'</span>
    <span>{{ matchAction.action }}</span>
  </div>
</template>
