<script setup>
const authError = useState("authError", () => null);
const menuOpen = ref(false);
</script>

<template>
  <div>
    <div
      v-if="authError"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center text-sm md:text-base"
      role="alert"
    >
      <span class="block sm:inline">{{ authError }}</span>
      <span
        class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
        @click="authError = null"
      >
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"
          />
        </svg>
      </span>
    </div>

    <nav class="bg-gray-800 text-white">
      <div class="flex items-center justify-between p-4 md:p-4">
        <!-- <span class="font-bold text-lg">FDMA</span> -->
        <button
          class="md:hidden text-white focus:outline-none"
          @click="menuOpen = !menuOpen"
          aria-label="Toggle menu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!menuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <ul
        class="flex-col md:flex-row flex gap-2 md:gap-4 px-4 pb-4 md:pb-4 md:flex md:justify-end"
        :class="{ hidden: !menuOpen, flex: menuOpen }"
      >
        <li class="hover:text-blue-600">
          <NuxtLink to="/" @click="menuOpen = false">Home</NuxtLink>
        </li>
        <li class="hover:text-blue-600">
          <NuxtLink to="/teams" @click="menuOpen = false">Teams</NuxtLink>
        </li>
        <li class="hover:text-blue-600">
          <NuxtLink to="/leagues" @click="menuOpen = false">Leagues</NuxtLink>
        </li>
        <li class="hover:text-blue-600">
          <NuxtLink to="/player-teams" @click="menuOpen = false"
            >Transfers</NuxtLink
          >
        </li>
        <li class="hover:text-blue-600">
          <NuxtLink to="/admin" @click="menuOpen = false">Admin</NuxtLink>
        </li>
      </ul>
    </nav>

    <NuxtPage />
  </div>
</template>
