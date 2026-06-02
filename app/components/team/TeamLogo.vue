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
});
</script>

<template>
  <NuxtLink :to="`/teams/${props.teamId}`" class="inline-block">
    <img :src="props.teamLogo" class="w-14 h-14 object-contain" />
  </NuxtLink>
</template>
