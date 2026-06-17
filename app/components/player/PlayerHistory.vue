<script setup>
const props = defineProps({
  playerId: {
    type: Number,
    required: true,
  },
  playerTeams: {
    type: Array,
    required: true,
  },
});

function formatDate(date) {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 shadow flex flex-col gap-3">
    <h2 class="text-lg font-semibold text-center">Team History</h2>

    <ul class="flex flex-col gap-2" v-if="playerTeams.length > 0">
      <li
        v-for="pt in playerTeams"
        :key="pt.id"
        class="flex items-center gap-3 border border-gray-200 rounded p-3"
      >
        <TeamLogo v-if="pt.team?.logo" :team-logo="pt.team.logo" />

        <div>
          <NuxtLink
            :to="`/teams/${pt.team.id}`"
            class="font-semibold hover:text-blue-600"
          >
            {{ pt.team.name }}
          </NuxtLink>
          <p class="text-sm text-gray-500">
            {{ formatDate(pt.startDate) }} — {{ formatDate(pt.endDate) }}
          </p>
        </div>
      </li>
    </ul>

    <p v-else class="text-center text-gray-500">No team history available</p>
  </div>
</template>
