<script setup>
const route = useRoute();
const playerId = route.params.id;

const { getPlayer } = usePlayer();
const player = await getPlayer(playerId);

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
