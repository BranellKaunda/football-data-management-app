<script setup>
import { authClient } from "~/lib/auth-client";

const session = authClient.useSession();
</script>

<template>
  <div class="mx-auto mt-16 max-w-md">
    <AdminSignin v-if="!session.data" />
    <AdminSignout v-else />
  </div>
</template>
