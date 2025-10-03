
import { GoogleGenAI, Type } from '@google/genai';
import type { LocationData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const locationInfoSchema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: 'A captivating, one-paragraph description of the location.',
    },
    facts: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: 'A list of 3-5 interesting facts or must-see spots about the location.',
    },
  },
  required: ['description', 'facts'],
};

async function generateTextContent(query: string): Promise<{description: string; facts: string[]}> {
  const prompt = `You are a world-class tour guide. For the location "${query}", provide a captivating, one-paragraph description and a list of 3-5 interesting facts or must-see spots.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: locationInfoSchema,
    },
  });

  try {
    const jsonText = response.text.trim();
    // It's good practice to parse to ensure it's valid JSON, even with the schema
    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON:", response.text);
    throw new Error("The API returned an invalid data format.");
  }
}

async function generateImage(query: string): Promise<string> {
  const prompt = `A stunning, high-quality, photorealistic image of ${query}. Cinematic lighting, vibrant colors, wide-angle shot.`;
  
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '16:9',
    },
  });

  if (response.generatedImages && response.generatedImages.length > 0) {
    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  }
  
  throw new Error('Image generation failed to produce an image.');
}

export async function generateLocationDetails(query: string): Promise<LocationData> {
  try {
    const [textContent, imageUrl] = await Promise.all([
      generateTextContent(query),
      generateImage(query),
    ]);

    return {
      description: textContent.description,
      facts: textContent.facts,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error('Error generating location details:', error);
    throw new Error(`Failed to fetch details for "${query}". Please check your API key and network connection.`);
  }
}
