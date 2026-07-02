<script setup>
const photoUrl = ref("");
const selectedFile = ref(null);
const emit = defineEmits(["handleUpload"]);
const authError = useState("authError");

function handleFileChange(event) {
  selectedFile.value = event.target.files[0];
}

async function handleFileUpload() {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  try {
    const res = await $fetch("/api/upload/photo", {
      method: "POST",
      body: formData,
    });

    photoUrl.value = res.url;
    emit("handleUpload", res.url);
  } catch (e) {
    if (e?.response?.status === 401) {
      authError.value = "You must be an Admin to perform this action.";
    }
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Upload Photo</h1>

    <form
      @submit.prevent="handleFileUpload"
      class="bg-white p-6 rounded shadow flex flex-col gap-4"
    >
      <div>
        <label for="photo" class="block text-sm font-medium text-gray-700"
          >Select Photo</label
        >
        <input
          type="file"
          id="photo"
          accept="image/*"
          @change="handleFileChange"
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        class="self-start px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Upload
      </button>
    </form>

    <div v-if="photoUrl" class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Uploaded Photo:</h2>
      <img
        :src="photoUrl"
        alt="Uploaded Photo"
        class="w-14 h-14 object-contain rounded-full shadow"
      />
    </div>
  </div>
</template>
