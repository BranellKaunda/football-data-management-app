<script setup>
import { useSession } from "~/lib/auth-client";

const { data: session } = useSession();

const { getAllMatchActions } = useMatchAction();
const matchActions = await getAllMatchActions();
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <NuxtLink
      v-if="session"
      to="/match-actions/create"
      class="inline-block mb-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      Create Match Action
    </NuxtLink>
    <h1 class="text-2xl font-bold mb-6 text-center">Match Actions</h1>
    <MatchActionList :match-actions="matchActions" />
  </div>
</template>
