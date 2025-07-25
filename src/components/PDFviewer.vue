<script setup>
import {
  VDocument,
  VPage,
  VText,
  VView,
  VStyleSheet,
  VFont,
} from "@vue-pdf/renderer";
import { defineProps } from "vue";

const props = defineProps({
  resep: {
    type: Object,
    required: true,
  },
});

VFont.register({
  family: "Roboto", // Nama font yang akan Anda gunakan di style
  src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.ttf",
});
VFont.register({
  family: "Roboto Bold",
  src: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc4.ttf",
  fontStyle: "normal",
  fontWeight: "bold",
});

const styles = VStyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Roboto",
  },
  section: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderWidth: 1, // Perhatikan properti border untuk @vue-pdf/renderer
    borderColor: "#EEEEEE",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontFamily: "Roboto Bold", // Gunakan font bold
    marginBottom: 10,
    color: "#34495E", // Biru gelap
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#7F8C8D",
  },
  heading: {
    fontSize: 18,
    fontFamily: "Roboto Bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#2C3E50", // Biru gelap
  },
  paragraph: {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 5,
    lineHeight: 1.5,
    color: "#333333",
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
    color: "#444444",
  },
  footer: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 30,
    color: "#BBBBBB",
    position: "absolute", // Mengatur posisi footer di bagian bawah halaman
    bottom: 20,
    left: 0,
    right: 0,
  },
});
</script>

<template>
  <VDocument>
    <VPage size="A4" :style="styles.page">
      <VView :style="styles.section">
        <VText :style="styles.title">{{ resep.nama }}</VText>
        <VText :style="styles.subtitle">{{ resep.deskripsi }}</VText>
      </VView>

      <VView :style="styles.section">
        <VText :style="styles.heading">Bahan-bahan:</VText>
        <VView>
          <VText
            v-for="(bahan, i) in resep.bahan"
            :key="i"
            :style="styles.listItem"
            >• {{ bahan }}</VText
          >
        </VView>
      </VView>

      <VView :style="styles.section">
        <VText :style="styles.heading">Langkah-langkah:</VText>
        <VView>
          <VText
            v-for="(langkah, i) in resep.langkah"
            :key="i"
            :style="styles.listItem"
            >{{ i + 1 }}. {{ langkah }}</VText
          >
        </VView>
      </VView>

      <VText :style="styles.footer" fixed>
        Dihasilkan oleh Aplikasi Resep AI | Halaman
        <VText
          render="({ pageNumber, totalPages }) => `${pageNumber} dari ${totalPages}`"
        />
      </VText>
    </VPage>
  </VDocument>
</template>
