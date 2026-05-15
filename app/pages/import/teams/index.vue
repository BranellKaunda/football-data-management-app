<script setup>
const selectedFile = ref(null);

function handleFileChange(event) {
  selectedFile.value = event.target.files[0];
}

async function handleFileUpload() {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  const res = await $fetch("http://localhost:8000/api/import/teams", {
    method: "POST",
    body: formData,
  });
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Import Teams</h1>

    <form
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

      <button
        type="submit"
        class="self-start px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="!selectedFile"
      >
        Import Teams
      </button>
    </form>
  </div>
</template>
