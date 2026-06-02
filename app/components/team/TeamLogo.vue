<script setup>
const props = defineProps({
  teamLogo: {
    type: String,
    required: true,
  },
  teamId: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <NuxtLink :to="`/teams/${props.teamId}`" class="inline-block">
    <img :src="props.teamLogo" class="w-10 h-10 object-contain" />
  </NuxtLink>
</template>
