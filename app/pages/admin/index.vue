<script setup>
import { authClient } from "~/lib/auth-client";

const { data: session } = await authClient.getSession();
</script>

<template>
  <div class="mx-auto mt-16 max-w-md">
    <AdminSignin v-if="!session" />
    <AdminSignout v-else />
  </div>
</template>
