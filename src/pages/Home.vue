<script setup>
import InputBahan from "@/components/InputBahan.vue";
import { ResepAi } from "@/api/gemini"; // Menggunakan nama fungsi yang sudah diperbaiki
import { ref } from "vue";
import SpotlightCard from "@/blocks/Components/SpotlightCard/SpotlightCard.vue";
import MainNavbar from "@/components/MainNavbar.vue";

const result = ref(null);
const loading = ref(false);
// Fungsi untuk menangani pencarian, dipanggil oleh komponen anak
const pilihResep = ref(null);
const showDialog = ref(false);

const detailResep = (resep) => {
  pilihResep.value = resep;
  showDialog.value = true;
};

const windowPrint = () => {
  window.print();
};

const handleSearch = async (listbahanResep) => {
  loading.value = true;
  result.value = ""; // Kosongkan hasil sebelumnya
  console.log("handleSearch dipanggil dengan bahan:", listbahanResep);

  try {
    const res = await ResepAi(listbahanResep); // Menggunakan nama fungsi yang sudah diperbaiki
    result.value = res;
    console.log("resep : ", result);
  } catch (error) {
    // Penanganan error tambahan jika promise reject (meskipun sudah ada di gemini.js)
    result.value = "Gagal memuat resep. Silakan coba lagi.";
    console.error("Kesalahan pada komponen Home:", error);
  } finally {
    // Pastikan loading selalu berhenti, baik berhasil maupun gagal
    loading.value = false;
  }
};
</script>

<template>
  <MainNavbar />
  <main
    class="w-full mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-12 max-w-screen-xl"
  >
    <header class="text-center mb-12">
      <h1
        class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight"
      >
        Temukan Resep Impianmu dengan <span class="text-indigo-600">AI</span>
      </h1>
      <p class="text-xl sm:text-2xl text-gray-600 mt-4 max-w-4xl mx-auto">
        Cukup masukkan bahan-bahan yang kamu miliki, dan biarkan AI kami
        menciptakan inspirasi kuliner yang sempurna untukmu.
      </p>
    </header>

    <InputBahan @submit="handleSearch" class="max-w-xl mx-auto mb-16" />

    <section class="mt-10">
      <div
        v-if="loading"
        class="text-center text-indigo-700 text-xl font-semibold animate-pulse"
      >
        <p>AI sedang meramu resep terbaik, mohon bersabar...</p>
      </div>

      <!-- card list -->
      <!-- Bahan tidak valid -->
      <div
        v-else-if="result === 'TIDAK'"
        class="text-center text-red-600 text-lg font-semibold"
      >
        Kombinasi bahan tidak valid atau berbahaya. Silakan ulangi dengan bahan
        lain.
      </div>
      <div
        v-else-if="Array.isArray(result) && result.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xl:gap-10"
      >
        <SpotlightCard
          v-for="(resep, index) in result"
          :id="index"
          class="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden cursor-pointer border border-gray-100"
          spotlight-color="rgba(100, 116, 139, 0.15)"
        >
          <div class="p-6 flex flex-col justify-between h-full">
            <h2 class="text-2xl font-bold text-gray-800 mb-3 leading-snug">
              {{ resep.nama }}
            </h2>
            <p class="text-gray-600 text-base mb-5 line-clamp-3">
              {{ resep.deskripsi }}
            </p>
            <div class="mt-auto">
              <button
                @click="detailResep(resep)"
                class="w-full bg-indigo-600 text-white py-3 px-5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2"
              >
                Lihat Resep
              </button>
            </div>
          </div>
        </SpotlightCard>

        <!-- dialog -->
        <transition name="fade">
          <div
            v-if="showDialog"
            class="fixed inset-0 z-50 flex items-center justify-center bg-indigo-400 backdrop-opacity-10"
            id="resep-detail-content"
          >
            <div class="bg-white rounded-xl p-6 w-full max-w-2xl relative">
              <button
                @click="showDialog = false"
                class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
              >
                ×
              </button>
              <div class="flex flex-col gap-3">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                  {{ pilihResep.nama }}
                </h2>
                <p>{{ pilihResep.deskripsi }}</p>

                <h3 class="font-semibold text-gray-700 mt-4">Bahan-bahan:</h3>
                <ul class="list-disc pl-5 text-gray-600">
                  <li v-for="(bahan, i) in pilihResep.bahan" :key="i">
                    {{ bahan }}
                  </li>
                </ul>

                <h3 class="font-semibold text-gray-700 mt-4">
                  Langkah-langkah:
                </h3>
                <ol class="list-decimal pl-5 text-gray-600 space-y-1">
                  <li v-for="(step, i) in pilihResep?.langkah" :key="i">
                    {{ step }}
                  </li>
                </ol>
                <button
                  @click="windowPrint"
                  class="bg-green-600 mt-10 text-white py-2 px-4 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
                >
                  Unduh PDF Resep
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div
        v-else
        class="text-center text-gray-500 text-xl mt-12 p-8 bg-gray-50 rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto"
      >
        <p>
          Maaf, resep tidak ditemukan. Coba kombinasi bahan lain atau periksa
          kembali ejaanmu!
        </p>
        <p class="text-lg mt-3">
          AI kami selalu siap memberikan inspirasi baru.
        </p>
      </div>
    </section>
  </main>
</template>
