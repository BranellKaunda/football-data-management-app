<script setup>
const { data: teams } = await useFetch("http://localhost:8000/api/teams");
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <div>
      <NuxtLink
        to="/import/teams"
        class="inline-block mb-6 px-4 py-2 font-semibold hover:text-blue-800"
        >Import Teams</NuxtLink
      >
    </div>

    <div>
      <NuxtLink
        to="/teams/create"
        class="inline-block mb-6 px-4 py-2 font-semibold hover:text-blue-800"
        >Register Team</NuxtLink
      >
    </div>

    <h1 class="text-2xl font-bold mb-6 text-center">Teams</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="team in teams"
        :key="team.id"
        class="bg-white p-4 rounded shadow flex items-center gap-4"
      >
        <!-- TEAM LOGO -->
        <NuxtLink :to="`/teams/${team.id}`">
          <img
            :src="team.logo"
            alt="team logo"
            class="w-14 h-14 object-contain rounded"
          />
        </NuxtLink>

        <!-- TEAM INFO -->
        <div class="flex flex-col">
          <NuxtLink :to="`/teams/${team.id}`" class="font-semibold text-lg">
            {{ team.name }}
          </NuxtLink>
          <p class="text-gray-600 text-sm capitalize">{{ team.location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
