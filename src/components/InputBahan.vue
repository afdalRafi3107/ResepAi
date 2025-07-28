<script setup>
import { ref } from "vue";
import { distance } from "fastest-levenshtein";
import { BadWords } from "@/utils/Badwords";

const emit = defineEmits(["submit"]);

const bahanResep = ref("");
const listbahanResep = ref([]);
const jum = ref(3);
const kataTerlarang = BadWords;
const errorMessage = ref("");
const loading = ref(false);

const toleransiTypo = 1;

function tambahBahan() {
  const bahan = bahanResep.value.trim().toLowerCase();
  if (!bahan) {
    errorMessage.value = "Bahan tidak boleh kosong";
  }
  try {
    listbahanResep.value.push(bahanResep.value.trim());
    bahanResep.value = "";
    errorMessage.value = "";
  } catch (error) {
    console.log(error);
  } finally {
  }
}

function hapusBahanMasak(index) {
  listbahanResep.value.splice(index, 1);
}

function kirimKeParent() {
  emit("submit", listbahanResep.value);
}
</script>

<template>
  <div
    class="w-full flex flex-col gap-4 space-y-4 max-w-2xl mx-auto p-4 sm:p-0"
  >
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex gap w-full">
        <input
          v-model="bahanResep"
          @keyup.enter="tambahBahan"
          type="text"
          class="flex-grow border border-gray-300 p-3 rounded-lg w-full text-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200"
          placeholder="Contoh: Ayam, Bawang Merah, Cabai Rawit..."
        />
        <!-- <input
          v-model="jum"
          type="number"
          class="flex-grow border border-gray-300 p-3 rounded-lg w-10 text-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200"
        /> -->
      </div>
      <button
        @click="tambahBahan"
        class="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:w-auto text-lg"
      >
        Tambah Bahan
      </button>
    </div>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    <div
      v-if="listbahanResep.length > 0"
      class="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200"
    >
      <span
        v-for="(item, i) in listbahanResep"
        :key="i"
        class="bg-indigo-100 text-indigo-800 px-4 py-2 text-base font-medium rounded-full flex items-center shadow-sm"
      >
        {{ item }}
        <button
          @click="hapusBahanMasak(i)"
          class="ml-2 -mr-1 text-indigo-600 hover:text-indigo-900 font-bold text-lg cursor-pointer"
          title="Hapus bahan"
        >
          ×
        </button>
      </span>
    </div>
    <div
      v-else
      class="text-center text-gray-500 p-4 bg-gray-50 rounded-lg border border-gray-200"
    >
      <p>Belum ada bahan yang ditambahkan.</p>
    </div>

    <button
      @click="kirimKeParent"
      :disabled="listbahanResep.length === 0"
      class="bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-indigo-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
    >
      Cari Resep Sekarang
    </button>
  </div>
</template>
