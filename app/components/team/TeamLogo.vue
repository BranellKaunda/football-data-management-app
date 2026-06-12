<script setup>
const props = defineProps({
  teamLogo: {
    type: String,
    required: true,
  },
  teamId: {
    type: Number,
    required: false,
  },
  size: {
    type: String,
    default: "w-12 h-12",
    required: false,
  },
});
</script>

<template>
  <NuxtLink :to="`/teams/${props.teamId}`" class="inline-block">
    <img :src="props.teamLogo" :class="size + ' object-contain'" />
  </NuxtLink>
</template>
