<script setup>
import { ref } from "vue";

const bahanResep = ref("");
const listbahanResep = ref([]);
function tambahBahan() {
  if (bahanResep.value.trim()) {
    listbahanResep.value.push(bahanResep.value.trim());
    bahanResep.value = "";
  }
  console.log("bahan resep : ", listbahanResep);
}
function hapusBahanMasak(index) {
  listbahanResep.value.splice(index, 1);
}
</script>

<template>
  <div class="space-y-2 flex flex-col gap-2">
    <div class="flex gap-2">
      <input
        v-model="bahanResep"
        type="text"
        class="border p-2 rounded w-full"
        placeholder="Masukkan Bahan Dapurmu"
      />
      <button
        @click="tambahBahan"
        class="bg-orange-500 text-white px-6 py-2 rounded"
      >
        +
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(item, i) in listbahanResep"
        :key="i"
        class="bg-gray-200 px-3 py-1 text-black rounded"
        >{{ item }}
        <button
          @click="hapusBahanMasak(i)"
          class="p-0 m-0 rounded-full cursor-pointer text-red-500 hover:text-red-800"
        >
          x
        </button>
      </span>
    </div>
  </div>
</template>
