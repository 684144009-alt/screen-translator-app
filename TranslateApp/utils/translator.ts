// ไฟล์: TranslateApp/utils/translator.ts

// 🔑 ตรงนี้อย่าลืมเอา API Key จาก Google AI Studio มาใส่นะครับ!
const GEMINI_API_KEY = "AIzaSyAtPYqMC79h_k4TMtGgI_PQ9UDZuL2RwfE"; 

export const translateImageWithAI = async (
  base64Image: string, 
  sourceLang: string, 
  targetLang: string
) => {
  try {
    const prompt = `
      คุณคือผู้เชี่ยวชาญด้านการแปลภาษาเกม หน้าที่ของคุณคือ:
      1. อ่านข้อความภาษา ${sourceLang} จากภาพที่ส่งให้
      2. แปลเป็นภาษา ${targetLang}
      3. ตอบกลับมา "เฉพาะคำแปลเท่านั้น"
    `;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/png",
                data: base64Image
              }
            }
          ]
        }
      ]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();

    if (data.error) {
        // 👇 สั่งให้มันปริ้นท์สาเหตุแบบเต็มๆ ลงใน Terminal ของคอมพิวเตอร์
        console.log("\n🚨 สาเหตุที่แท้จริงจาก Google:", data.error.message, "\n");
        return `❌ ดูสาเหตุเต็มๆ ในช่อง Terminal ของคอมครับ`;
    }

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
        return "🤖 AI เชื่อมต่อสำเร็จ 100%! (แต่มองไม่เห็นตัวหนังสือในภาพเทสครับ)";
    }

  } catch (error: any) {
    return `❌ เน็ตหลุดหรือขัดข้อง: ${error.message}`;
  }
};