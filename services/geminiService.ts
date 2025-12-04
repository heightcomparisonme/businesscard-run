import { GoogleGenAI, Type } from "@google/genai";
import { CardData, CardTheme } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCardContent = async (
  currentData: Partial<CardData>
): Promise<{ tagline: string; suggestedTitle: string }> => {
  try {
    const ai = getAiClient();
    const prompt = `
      I am creating a business card. 
      My name is "${currentData.fullName || 'User'}".
      My current job title is "${currentData.jobTitle || 'Professional'}".
      My company is "${currentData.companyName || 'My Company'}".
      
      Please generate:
      1. A professional, catchy, short tagline (max 10 words).
      2. A refined, impressive version of my job title (e.g., "Software Engineer" -> "Senior Solutions Architect").
      
      Return JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tagline: { type: Type.STRING },
            suggestedTitle: { type: Type.STRING },
          },
          required: ["tagline", "suggestedTitle"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");

    const parsed = JSON.parse(resultText);
    return {
      tagline: parsed.tagline,
      suggestedTitle: parsed.suggestedTitle,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateCardDesign = async (
  description: string,
  currentData: Partial<CardData>
): Promise<{ theme: CardTheme; primaryColor: string; tagline: string; suggestedTitle: string }> => {
  try {
    const ai = getAiClient();
    const prompt = `
      I need to design a business card based on this description: "${description}".
      
      Context:
      Name: "${currentData.fullName || 'User'}"
      Company: "${currentData.companyName || 'Company'}"
      
      Task:
      1. Select the most appropriate visual THEME from this list:
         [MODERN, CLASSIC, MINIMALIST, CREATIVE, TECH, ELEGANT, BOLD, GEOMETRIC, HORIZON, MONOGRAM, NEON, GRID].
         - ELEGANT: Luxury, high-end, serif fonts.
         - BOLD: High impact, loud, colorful background.
         - GEOMETRIC: Architectural, clean lines, shapes.
         - TECH: Futuristic, coding, digital.
         - CREATIVE: Artistic, unique gradients.
         - HORIZON: Calm gradients, horizon line, airy.
         - MONOGRAM: Initial-focused, balanced white space.
         - NEON: Dark with glow, tech nightlife vibe.
         - GRID: Blueprint/structured grid background.
         - CLASSIC/MODERN/MINIMALIST: Standard business styles.
      2. Select a PRIMARY COLOR (hex code) that matches the mood of the description.
      3. Generate a catchy TAGLINE.
      4. Refine the JOB TITLE to fit the persona.

      Return JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theme: { type: Type.STRING, enum: Object.values(CardTheme) },
            primaryColor: { type: Type.STRING },
            tagline: { type: Type.STRING },
            suggestedTitle: { type: Type.STRING },
          },
          required: ["theme", "primaryColor", "tagline", "suggestedTitle"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");

    const parsed = JSON.parse(resultText) as { theme: CardTheme; primaryColor: string; tagline: string; suggestedTitle: string };
    
    // Validate theme just in case
    const safeTheme = Object.values(CardTheme).includes(parsed.theme) ? parsed.theme : CardTheme.MODERN;

    return {
      theme: safeTheme,
      primaryColor: parsed.primaryColor,
      tagline: parsed.tagline,
      suggestedTitle: parsed.suggestedTitle,
    };
  } catch (error) {
    console.error("Gemini Design API Error:", error);
    throw error;
  }
};
