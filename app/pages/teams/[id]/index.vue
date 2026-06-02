<script setup>
const route = useRoute();
const { data: team } = await useFetch(
  `http://localhost:8000/api/teams/${route.params.id}`,
  {
    query: route.query,
  },
);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Teams</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        :key="team.id"
        class="bg-white p-4 rounded shadow flex items-center gap-4"
      >
        <!-- TEAM LOGO -->
        <TeamLogo :teamLogo="team.logo" :teamId="team.id" />

        <!-- TEAM INFO -->
        <div class="flex flex-col">
          <NuxtLink :to="`/teams/${team.id}`" class="font-semibold text-lg">
            {{ team.name }}
          </NuxtLink>
          <p class="text-gray-600 text-sm capitalize">{{ team.location }}</p>
          <NuxtLink
            :to="`/teams/${team.id}/edit`"
            class="text-blue-600 text-sm mt-2 hover:underline"
          >
            Edit Team
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- RECENT MATCHES -->
  <MatchMatches :recentMatches="[]" />
</template>
