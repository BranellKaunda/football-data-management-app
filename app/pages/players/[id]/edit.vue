<script setup>
const route = useRoute();
const playerId = route.params.id;

const { data: player } = await useFetch(
  `http://localhost:8000/api/players/${playerId}`,
);

const onCancel = () => {
  navigateTo(`/players/${playerId}`);
};

const onSave = () => {
  navigateTo(`/players/${playerId}`);
};
</script>

<template>
  <PlayerForm v-model="player" @cancel="onCancel" @save="onSave" />
</template>
