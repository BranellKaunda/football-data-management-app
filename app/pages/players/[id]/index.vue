<script setup>
const route = useRoute();

const { getPlayer } = usePlayer();
const player = await getPlayer(route.params.id);
</script>

<template>
  <div
    class="bg-white p-6 rounded shadow max-w-md mx-auto m-10 flex flex-col gap-4"
  >
    <h1 class="text-2xl font-bold text-center">Player Details</h1>

    <!-- TEAM LOGO + NAME -->
    <div class="flex items-center gap-4">
      <TeamLogo :teamLogo="player.team.logo" :teamId="player.team.id" />
      <div>
        <p class="text-lg font-semibold">{{ player.team.name }}</p>
        <p class="text-gray-600 text-sm">{{ player.team.location }}</p>
      </div>
    </div>

    <hr />

    <!-- PLAYER INFO -->
    <div class="flex flex-col gap-2">
      <div>
        <p class="text-gray-500 text-sm">First Name</p>
        <p class="font-medium">{{ player.firstName }}</p>
      </div>

      <div>
        <p class="text-gray-500 text-sm">Last Name</p>
        <p class="font-medium">{{ player.lastName }}</p>
      </div>

      <div>
        <p class="text-gray-500 text-sm">Date of Birth</p>
        <p class="font-medium">{{ player.dob }}</p>
      </div>

      <div>
        <p class="text-gray-500 text-sm">Position</p>
        <p class="font-medium capitalize">{{ player.position }}</p>
      </div>

      <div>
        <p class="text-gray-500 text-sm">Height</p>
        <p class="font-medium">{{ player.heightCm }} cm</p>
      </div>

      <div>
        <p class="text-gray-500 text-sm">Weight</p>
        <p class="font-medium">{{ player.weightKg }} kg</p>
      </div>
    </div>

    <!-- BUTTON -->
    <div class="flex justify-end mt-4">
      <NuxtLink
        :to="`/players/${player.id}/edit`"
        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Edit Player
      </NuxtLink>
    </div>
  </div>
</template>
