<script setup>
import { authClient } from "~/lib/auth-client";

const session = authClient.useSession();

const { getAllPlayers } = usePlayer();
const players = await getAllPlayers();
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <NuxtLink
      v-if="session.data"
      to="/players/create"
      class="inline-block mb-6 px-4 py-2 font-semibold hover:text-blue-800"
      >Register Player</NuxtLink
    >

    <h1 class="text-2xl font-bold mb-6 text-center">Players</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" v-if="players">
      <div
        v-for="player in players"
        :key="player.id"
        class="bg-white p-4 rounded shadow flex items-center gap-4"
      >
        <!-- PLAYER IMAGE PLACEHOLDER -->
        <NuxtLink :to="`/players/${player.id}`">
          <PlayerImagePlaceholder
            :first-name="player.firstName"
            :last-name="player.lastName"
          />
        </NuxtLink>

        <!-- PLAYER INFO -->
        <div class="flex flex-col">
          <NuxtLink
            :to="`/players/${player.id}`"
            class="font-semibold text-lg hover:text-blue-600"
          >
            {{ player.firstName }} {{ player.lastName }}
          </NuxtLink>
          <p class="text-gray-600 capitalize text-sm">
            {{ player.position }}
          </p>
          <p class="text-gray-500 text-xs">
            {{ player.team.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
