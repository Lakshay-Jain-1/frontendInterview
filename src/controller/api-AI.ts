import { GoogleGenerativeAI } from "@google/generative-ai";

async function AI(data) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",generationConfig: { responseMimeType: "application/json" } });

  const prompt = `${data}`;

  const result = await model.generateContent([prompt]);
  const response = result.response;

  const text = response.text();
  return text;
}

export default AI;
