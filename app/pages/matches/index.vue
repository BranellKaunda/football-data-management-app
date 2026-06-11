<template>
  <div class="max-w-3xl mx-auto p-6">
    <!--  <NuxtLink
      to="/import/matches"
      class="inline-block mb-6 px-4 py-2 font-semibold hover:text-blue-800"
      >Import Matches</NuxtLink
    > -->

    <div>
      <NuxtLink
        to="/matches/create"
        class="inline-block mb-6 px-4 py-2 font-semibold hover:text-blue-800"
      >
        Create Match
      </NuxtLink>
    </div>

    <!-- MATCHES -->
    <MatchList />
  </div>
</template>
