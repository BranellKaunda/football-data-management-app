<script setup>
import { authClient } from "~/lib/auth-client";

const session = authClient.useSession();

const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
});

const { deleteMatch } = useMatch();

const onDelete = async (matchId) => {
  await deleteMatch(matchId);
  navigateTo("/matches");
};
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Matches</h1>

    <div class="flex flex-col gap-4">
      <div class="bg-white p-4 rounded shadow flex flex-col gap-3 relative">
        <!-- MAIN MATCH ROW -->
        <div class="flex items-center justify-between gap-4">
          <!-- HOME TEAM -->
          <div class="flex items-center gap-2 w-1/3">
            <TeamLogo
              :teamLogo="match.homeTeam.logo"
              :teamId="match.homeTeam.id"
            />

            <NuxtLink
              :to="`/teams/${match.homeTeam.id}`"
              class="font-medium text-sm hover:text-blue-600"
            >
              {{ match.homeTeam.name }}
            </NuxtLink>
          </div>

          <!-- SCORE -->
          <div class="text-lg font-bold text-center w-1/3">
            {{ match.homeTeamGoals }}
            <span class="text-gray-500">vs</span>
            {{ match.awayTeamGoals }}
          </div>

          <!-- AWAY TEAM -->
          <div class="flex items-center justify-end gap-2 w-1/3">
            <NuxtLink
              :to="`/teams/${match.awayTeam.id}`"
              class="font-medium text-sm text-right hover:text-blue-600"
            >
              {{ match.awayTeam.name }}
            </NuxtLink>

            <TeamLogo
              :teamLogo="match.awayTeam.logo"
              :teamId="match.awayTeam.id"
            />
          </div>
        </div>

        <!-- COMPETITION + DATE -->
        <div class="text-gray-600 text-sm text-center">
          {{ match.competition?.name }} • {{ match.matchDate }} •
          {{ match.status }}
        </div>

        <!-- REFEE -->

        <div class="text-center flex justify-center gap-4 mt-4">
          <NuxtLink
            v-if="session.data"
            class="text-blue-600 hover:text-blue-800 text-sm"
            :to="`/matches/${match.id}/edit`"
          >
            Edit Match
          </NuxtLink>

          <NuxtLink
            class="text-blue-600 hover:text-blue-800 text-sm"
            :to="`/matches/${match.id}`"
          >
            Details
          </NuxtLink>

          <div v-if="session.data">
            <button
              @click="onDelete(match.id)"
              class="absolute bottom-2 right-6 hover:scale-110"
            >
              <img src="/delete-icon.png" alt="Delete" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-else-if="!data">
      <p class="text-center text-gray-500">No matches found.</p>
    </div> -->
  </div>
</template>
