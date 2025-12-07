import { GoogleGenAI } from "@google/genai";
import { MenuItem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCateringAdvice = async (
  userMessage: string, 
  menuItems: MenuItem[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const systemPrompt = `You are the helpful, friendly, and knowledgeable assistant for Paparazzi Pizza in Carrollton, TX.

About Us:
- We are "Where Flavor Gets Famous".
- Family-owned since 2005.
- We pride ourselves on crisp crust (never soggy!), fresh dough made daily, and Greek-inspired flavors.
- Tone: Real talk, enthusiastic, welcoming, and confident. We aren't a corporate chain; we are the hometown pizza joint.

Menu Context:
${JSON.stringify(menuItems, null, 2)}

Logistics:
- Located at 2145 N Josey Ln #114, Carrollton, TX 75006.
- Phone: 972-820-8686.
- Minimum order for delivery is typically $75 for catering.
- 24-hour notice recommended for large catering orders.

Your Goal:
- Suggest items based on the user's needs (e.g., "feed a party of 20", "vegetarian options").
- If they ask about portions, use the 'serves' data to guide them.
- Be concise. Don't write an essay.
- If unsure, encourage them to call 972-820-8686 for the best service.
`;

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 500,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};