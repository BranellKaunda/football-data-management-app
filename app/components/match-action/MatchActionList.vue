<script setup>
const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
});

const { data: matchActions } = await useFetch(
  `http://localhost:8000/api/match-actions?matchId=${props.match.id}`,
);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <NuxtLink
      to="/match-actions/create"
      class="inline-block mb-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      Create Match Action
    </NuxtLink>
    <h1 class="text-2xl font-bold mb-6 text-center">Match Actions</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" v-if="matchActions">
      <div
        v-for="action in matchActions"
        :key="action.id"
        class="bg-white p-4 rounded shadow flex flex-col gap-2"
      >
        <NuxtLink
          :to="`/match-actions/${action.id}`"
          class="font-semibold text-lg hover:text-blue-600"
        >
          <MatchActionLogo :match-action="action" />
        </NuxtLink>
        <p class="text-gray-600 text-sm">
          Player: {{ action.player?.firstName }} {{ action.player?.lastName }}
        </p>
        <TeamLogo :team-logo="action.team?.logo" />
      </div>
    </div>
  </div>
</template>