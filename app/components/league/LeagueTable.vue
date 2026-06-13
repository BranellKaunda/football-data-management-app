<script setup>
const props = defineProps({
  matches: {
    type: Array,
    required: true,
  },
  highlightTeamId: {
    type: Number,
    default: null,
  },
});

const tableData = computed(() => {
  const teams = {};

  const finishedMatches = props.matches.filter((m) => m.status === "Finished");

  for (const match of finishedMatches) {
    const homeId = match.homeTeam.id;
    const awayId = match.awayTeam.id;
    const homeGoals = match.homeTeamGoals ?? 0;
    const awayGoals = match.awayTeamGoals ?? 0;

    if (!teams[homeId]) {
      teams[homeId] = {
        id: homeId,
        name: match.homeTeam.name,
        logo: match.homeTeam.logo,
        mp: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
      };
    }
    if (!teams[awayId]) {
      teams[awayId] = {
        id: awayId,
        name: match.awayTeam.name,
        logo: match.awayTeam.logo,
        mp: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
      };
    }

    const home = teams[homeId];
    const away = teams[awayId];

    home.mp++;
    away.mp++;
    home.gf += homeGoals;
    home.ga += awayGoals;
    away.gf += awayGoals;
    away.ga += homeGoals;

    if (homeGoals > awayGoals) {
      home.w++;
      home.pts += 3;
      away.l++;
    } else if (homeGoals < awayGoals) {
      away.w++;
      away.pts += 3;
      home.l++;
    } else {
      home.d++;
      away.d++;
      home.pts += 1;
      away.pts += 1;
    }
  }

  for (const teamId in teams) {
    teams[teamId].gd = teams[teamId].gf - teams[teamId].ga;
  }

  return Object.values(teams).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
});
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-lg font-semibold mb-6 text-center">League Table</h1>

    <div
      v-if="tableData.length"
      class="bg-white rounded shadow overflow-hidden"
    >
      <table class="w-full text-sm">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="p-3 text-left font-semibold">#</th>
            <th class="p-3 text-left font-semibold">Team</th>
            <th class="p-3 text-center font-semibold">MP</th>
            <th class="p-3 text-center font-semibold">W</th>
            <th class="p-3 text-center font-semibold">D</th>
            <th class="p-3 text-center font-semibold">L</th>
            <th class="p-3 text-center font-semibold">GF</th>
            <th class="p-3 text-center font-semibold">GA</th>
            <th class="p-3 text-center font-semibold">GD</th>
            <th class="p-3 text-center font-semibold">Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(team, index) in tableData"
            :key="team.id"
            class="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
            :class="team.id === highlightTeamId ? 'bg-blue-100' : ''"
          >
            <td
              :class="
                index == 0
                  ? 'p-3 text-yellow-500'
                  : index >= 13
                    ? 'p-3 text-red-500'
                    : 'p-3 text-gray-500'
              "
            >
              {{ index + 1 }}
            </td>
            <td class="p-3">
              <div class="flex items-center gap-2">
                <img
                  :src="team.logo"
                  :alt="team.name"
                  class="w-6 h-6 object-contain"
                />
                <NuxtLink
                  :to="`/teams/${team.id}`"
                  class="font-medium hover:text-blue-600"
                >
                  {{ team.name }}
                </NuxtLink>
              </div>
            </td>
            <td class="p-3 text-center">{{ team.mp }}</td>
            <td class="p-3 text-center text-green-600">{{ team.w }}</td>
            <td class="p-3 text-center text-yellow-600">{{ team.d }}</td>
            <td class="p-3 text-center text-red-600">{{ team.l }}</td>
            <td class="p-3 text-center">{{ team.gf }}</td>
            <td class="p-3 text-center">{{ team.ga }}</td>
            <td
              class="p-3 text-center"
              :class="
                team.gd > 0
                  ? 'text-green-600'
                  : team.gd < 0
                    ? 'text-red-600'
                    : ''
              "
            >
              {{ team.gd > 0 ? "+" : "" }}{{ team.gd }}
            </td>
            <td class="p-3 text-center font-semibold text-sm">
              {{ team.pts }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-500 py-8">
      No finished matches to calculate standings.
    </div>
  </div>
</template>
