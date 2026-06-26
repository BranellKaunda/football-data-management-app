<script setup>
import { authClient } from "~/lib/auth-client";

const session = authClient.useSession();

const selectedFile = ref(null);
const competitionId = ref(null);
const status = ref(null);
const loading = ref(false);

const { getAllLeagues } = useLeague();
const competitions = await getAllLeagues();

function handleFileChange(event) {
  selectedFile.value = event.target.files[0];
  status.value = null;
}

async function handleFileUpload() {
  if (!selectedFile.value) return;

  loading.value = true;
  status.value = null;

  try {
    const formData = new FormData();
    formData.append("file", selectedFile.value);
    formData.append("competitionId", competitionId.value);

    const res = await $fetch("/api/import/matches", {
      method: "POST",
      body: formData,
    });

    if (res.error) {
      status.value = { type: "error", message: res.error };
    } else {
      status.value = {
        type: "success",
        message: `Successfully imported! ${res.inserted} matches created, ${res.skipped} skipped.`,
      };
    }
  } catch (err) {
    status.value = { type: "error", message: err.message || "Upload failed" };
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Import Matches</h1>

    <form
      v-if="session.data"
      @submit.prevent="handleFileUpload"
      class="bg-white p-6 rounded shadow flex flex-col gap-4"
    >
      <div>
        <label for="csvFile" class="block text-sm font-medium text-gray-700"
          >Select CSV File</label
        >
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          @change="handleFileChange"
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div>
        <label
          for="competitionId"
          class="block text-sm font-medium text-gray-700"
          >Competition</label
        >
        <select v-model="competitionId" placeholder="select a competion">
          <option disabled value="">Select a competition</option>
          <option
            v-for="league in competitions"
            :key="league.id"
            :value="league.id"
          >
            {{ league.name }} {{ league.season }}
          </option>
        </select>
      </div>

      <div
        v-if="status"
        :class="[
          'px-4 py-3 rounded text-sm font-medium',
          status.type === 'success'
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300',
        ]"
      >
        {{ status.message }}
      </div>

      <button
        type="submit"
        class="self-start px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="!selectedFile || loading"
      >
        {{ loading ? "Importing..." : "Import Matches" }}
      </button>
    </form>
  </div>
</template>
