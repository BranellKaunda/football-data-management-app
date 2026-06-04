<script setup>
const props = defineProps({
  matchAction: {
    type: Object,
    required: true,
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
      :width="24"
      :height="24"
      class="shrink-0"
      alt="Action Icon"
    />
  </div>
</template>
