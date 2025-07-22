export async function ResepAi(listbahan) {
    const promp = `saya punya bahan: ${listbahan.join(', ')}. Berikan saya 3 Resep Makanan yang bisa saya buat dari bahan tersebut. Sertakan nama resep, dan cara memasaknya.`   
    
 const res = await fetch("https://api.openai.com/v1/chat/completions",{
    method: "POST",
    headers:{
        Auto
    }
 })
}