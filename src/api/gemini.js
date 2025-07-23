import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAItest = new GoogleGenerativeAI(
  `${import.meta.env.VITE_GEMINI_API_KEY}`
);
export async function ResepAi(listbahanResep, jumResep) {
  if (!Array.isArray(listbahanResep) || listbahanResep.length === 0) {
    return "Daftar bahan tidak valid atau kosong.";
  }

  try {
    const model = genAItest.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Saya punya bahan-bahan berikut: ${listbahanResep.join(
      ", "
    )}. Berikan saya 3 ide resep makanan lengkap yang bisa saya buat dari bahan-bahan tersebut.
     PENTING: Kembalikan jawaban HANYA dalam format array JSON yang valid. Jangan tambahkan teks pembuka atau penutup.
  Contoh format yang diinginkan:
  [
    {
      "nama": "Nama Resep 1",
      "deskripsi:"deskripsi resep",
      "bahan": ["bahan A dari daftar saya", "bahan B dari daftar saya"],
      "langkah": ["Langkah pertama memasak.", "Langkah kedua.", "Dan seterusnya."]
    },
    {
      "nama": "Nama Resep 2",
      "deskripsi:"deskripsi resep",
      "bahan": ["bahan C", "bahan D"],
      "langkah": ["1Langkah pertama.", "Langkah kedua."]
    }
  `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Terjadi kesalahan saat memanggil API:", error);
    return [];
  }
}
