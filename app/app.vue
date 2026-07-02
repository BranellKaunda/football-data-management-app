<script setup>
const authError = useState("authError", () => null);
const menuOpen = ref(false);
</script>

<template>
  <div>
    <div
      v-if="authError"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm relative flex items-center justify-between gap-2"
      role="alert"
    >
      <span>{{ authError }}</span>
      <button
        class="text-red-400 hover:text-red-600 shrink-0"
        @click="authError = null"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <nav class="bg-slate-900 text-white border-b border-slate-700">
      <div class="flex items-center justify-end p-4">
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
        class="flex-col md:flex-row flex gap-1 px-4 pb-4 md:pb-4 md:flex md:justify-center md:gap-0"
        :class="{ hidden: !menuOpen, flex: menuOpen }"
      >
        <li>
          <NuxtLink
            to="/"
            exact-active-class="text-white bg-slate-800"
            class="block px-4 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            @click="menuOpen = false"
            >Home</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/teams"
            exact-active-class="text-white bg-slate-800"
            class="block px-4 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            @click="menuOpen = false"
            >Teams</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/leagues"
            exact-active-class="text-white bg-slate-800"
            class="block px-4 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            @click="menuOpen = false"
            >Leagues</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/player-teams"
            exact-active-class="text-white bg-slate-800"
            class="block px-4 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            @click="menuOpen = false"
            >Transfers</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/admin"
            exact-active-class="text-white bg-slate-800"
            class="block px-4 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            @click="menuOpen = false"
            >Admin</NuxtLink
          >
        </li>
      </ul>
    </nav>

    <NuxtPage />
  </div>
</template>
