
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateRecipe(userInput: string): Promise<Recipe> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are AuraChef, a wellness assistant. Create a healthy, minimalist recipe based on: "${userInput}". 
    The recipe must have EXACTLY 3 steps. Provide a brief wellness tip. 
    Also, generate a detailed image prompt for a high-aesthetic food photo with soft natural lighting and minimalist plating.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          ingredients: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          steps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            minItems: 3,
            maxItems: 3
          },
          wellnessTip: { type: Type.STRING },
          imagePrompt: { type: Type.STRING }
        },
        required: ["title", "ingredients", "steps", "wellnessTip", "imagePrompt"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No recipe generated");
  return JSON.parse(text) as Recipe;
}

export async function generateFoodImage(prompt: string): Promise<string> {
  // Enhancing prompt for aesthetics
  const aestheticPrompt = `Professional high-end food photography of ${prompt}. 
  Minimalist plating, soft natural morning light, neutral linen background, high resolution, clean composition, zen atmosphere.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: aestheticPrompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "4:3"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data found in response");
}
