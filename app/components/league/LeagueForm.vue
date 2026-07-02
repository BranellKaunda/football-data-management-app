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

const teamsData = computed(() => {
  const allTeams = {};

  const finishedMatches = props.matches?.filter((m) => m.status === "Finished");

  const sortedMatches = [...finishedMatches].sort(
    (a, b) => new Date(b.matchDate) - new Date(a.matchDate),
  );

  for (const match of sortedMatches) {
    const homeId = match.homeTeam.id;
    const awayId = match.awayTeam.id;

    if (!allTeams[homeId]) {
      allTeams[homeId] = {
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
        form: [],
      };
    }
    if (!allTeams[awayId]) {
      allTeams[awayId] = {
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
        form: [],
      };
    }

    const home = allTeams[homeId];
    const away = allTeams[awayId];

    if (home.form.length < 5) {
      const homeGoals = match.homeTeamGoals ?? 0;
      const awayGoals = match.awayTeamGoals ?? 0;

      home.mp++;
      home.gf += homeGoals;
      home.ga += awayGoals;

      let homeResult;
      if (homeGoals > awayGoals) {
        home.w++;
        home.pts += 3;
        homeResult = "W";
      } else if (homeGoals < awayGoals) {
        home.l++;
        homeResult = "L";
      } else {
        home.d++;
        home.pts += 1;
        homeResult = "D";
      }

      home.form.push({
        result: homeResult,
        matchId: match.id,
        opponent: match.awayTeam.name,
        homeGoals,
        awayGoals,
        date: match.matchDate,
        isHome: true,
      });
    }

    if (away.form.length < 5) {
      const homeGoals = match.homeTeamGoals ?? 0;
      const awayGoals = match.awayTeamGoals ?? 0;

      away.mp++;
      away.gf += awayGoals;
      away.ga += homeGoals;

      let awayResult;
      if (awayGoals > homeGoals) {
        away.w++;
        away.pts += 3;
        awayResult = "W";
      } else if (awayGoals < homeGoals) {
        away.l++;
        awayResult = "L";
      } else {
        away.d++;
        away.pts += 1;
        awayResult = "D";
      }

      away.form.push({
        result: awayResult,
        matchId: match.id,
        opponent: match.homeTeam.name,
        homeGoals,
        awayGoals,
        date: match.matchDate,
        isHome: false,
      });
    }
  }

  for (const teamId in allTeams) {
    allTeams[teamId].gd = allTeams[teamId].gf - allTeams[teamId].ga;
  }

  return Object.values(allTeams).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
});

const resultClass = (result) => {
  if (result === "W") return "bg-green-500 text-white";
  if (result === "L") return "bg-red-500 text-white";
  return "bg-yellow-400 text-white";
};

const tooltipText = (entry) => {
  const side = entry.isHome ? "vs" : "@";
  return `${entry.opponent} ${side} ${entry.homeGoals}-${entry.awayGoals} (${entry.date})`;
};
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-lg font-semibold mb-6 text-center">League Form</h1>

    <div
      v-if="teamsData.length"
      class="bg-white rounded shadow overflow-x-auto"
    >
      <table class="w-full text-sm min-w-[600px]">
        <thead class="bg-gray-100 border-b border-gray-200">
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
            <th class="p-3 text-center font-semibold">Form</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(team, index) in teamsData"
            :key="team.id"
            class="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
            :class="team.id === highlightTeamId ? 'bg-blue-100' : ''"
          >
            <td class="p-3 text-gray-500">{{ index + 1 }}</td>
            <td class="p-3">
              <div class="flex items-center gap-2">
                <img
                  :src="team.logo"
                  :alt="team.name"
                  class="w-6 h-6 object-contain"
                />
                <NuxtLink
                  :to="`/teams/${team.id}`"
                  class="font-normal hover:text-blue-600"
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
            <td class="p-3">
              <div class="flex items-center justify-center gap-1">
                <div
                  v-for="(entry, i) in team.form"
                  :key="i"
                  class="relative group"
                >
                  <NuxtLink :to="`/matches/${entry.matchId}`" class="block">
                    <div
                      class="w-6 h-6 rounded text-xs font-bold flex items-center justify-center cursor-pointer"
                      :class="resultClass(entry.result)"
                    >
                      {{ entry.result }}
                    </div>
                  </NuxtLink>
                  <div
                    class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    {{ tooltipText(entry) }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-500 py-8">
      No finished matches to calculate form.
    </div>
  </div>
</template>
