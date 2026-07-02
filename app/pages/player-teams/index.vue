<script setup>
const { getAllPlayerTeams } = usePlayerTeam();
const records = await getAllPlayerTeams();
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
      <h1 class="text-xl sm:text-2xl font-bold">Assign players to teams</h1>
      <NuxtLink
        to="/player-teams/create"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded text-sm sm:text-base"
      >
        New Assignment
      </NuxtLink>
    </div>

    <div class="bg-white rounded shadow overflow-x-auto" v-if="records?.length">
      <table class="w-full text-left min-w-[500px]">
        <thead class="bg-gray-100 border-b border-gray-200">
          <tr>
            <th class="p-3 font-semibold text-sm">Player</th>
            <th class="p-3 font-semibold text-sm">Team</th>
            <th class="p-3 font-semibold text-sm">Start</th>
            <th class="p-3 font-semibold text-sm">End</th>
            <th class="p-3 font-semibold text-sm">Type</th>
            <th class="p-3 font-semibold text-sm"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in records"
            :key="record.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="p-3">
              <NuxtLink
                :to="`/players/${record.player.id}`"
                class="font-normal hover:text-blue-600"
              >
                {{ record.player?.firstName }} {{ record.player?.lastName }}
              </NuxtLink>
            </td>
            <td class="p-3">{{ record.team?.name }}</td>
            <td class="p-3 text-sm text-gray-600">{{ record.startDate }}</td>
            <td class="p-3 text-sm text-gray-600">
              {{ record.endDate || "—" }}
            </td>
            <td class="p-3 text-sm">
              <span
                v-if="record.transfer"
                class="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium"
              >
                Transfer
              </span>
              <span
                v-if="record.loan"
                class="inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium"
              >
                Loan
              </span>
              <span
                v-if="!record.transfer && !record.loan"
                class="text-gray-400 text-xs"
              >
                —
              </span>
            </td>
            <td class="p-3 text-right">
              <NuxtLink
                :to="`/player-teams/${record.id}/edit`"
                class="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="text-center text-gray-500 mt-10">No assignments found.</p>
  </div>
</template>
