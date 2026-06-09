<script setup>
const props = defineProps({
  matchActions: {
    type: Array,
    required: true,
  },
  size: {
    type: Number,
    default: 24,
    required: false,
  },
});
</script>

<template>
  <div class="bg-white p-4 rounded shadow">
    <ul class="flex flex-col gap-4">
      <li
        class="flex items-center gap-3"
        v-for="action in matchActions"
        :key="action.id"
      >
        <TeamLogo
          :team-logo="action.team?.logo"
          size="w-10 h-10"
          :team-id="action.team.id"
        />

        <span class="text-sm text-gray-600"
          >{{ action.player?.firstName }} {{ action.player?.lastName }}</span
        >

        <MatchActionLogo :match-action="action" :width="size" :height="size" />

        <span class="font-medium tabular-nums">{{ action.minute }}'</span>
        <span
          class="text-sm text-gray-600"
          v-if="action.action === 'Substitution' && action.playerExtra"
          >({{ action.playerExtra.firstName }}
          {{ action.playerExtra.lastName }})</span
        >
        <span
          class="text-sm text-gray-600"
          v-if="action.action === 'Goal' && action.playerExtra"
          >(
          {{ action.playerExtra.firstName }}
          {{ action.playerExtra.lastName }})</span
        >
      </li>
    </ul>
  </div>
</template>
