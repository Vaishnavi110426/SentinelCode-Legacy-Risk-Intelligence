
import { GoogleGenAI, Type } from "@google/genai";
import { CodeModule } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function explainRisk(module: CodeModule): Promise<{ explanation: string, refactoring: string[] }> {
  try {
    const prompt = `
      Analyze the following code module risk profile and provide a professional, concise explanation for a developer.
      
      Module: ${module.name}
      Path: ${module.path}
      Risk Score: ${module.riskScore}/100
      Metrics:
      - Complexity: ${module.metrics.complexity}
      - Churn (frequency of changes): ${module.metrics.churn}
      - Coupling (dependencies): ${module.metrics.coupling}
      - Test Coverage: ${module.metrics.coverage}%
      - Knowledge Concentration (Ownership): ${module.metrics.ownership}
      
      Structure your response as a JSON object with two fields:
      1. "explanation": A natural language paragraph explaining WHY this module is risky or safe. Focus on the interplay between the metrics (e.g., high churn + low coverage = disaster).
      2. "refactoring": An array of 3 actionable steps to reduce the risk.
      
      Do not hallucinate facts. Be direct and technical. Use a professional tone suitable for enterprise environments.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING },
            refactoring: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      explanation: "Failed to generate AI reasoning. Please check your connectivity and risk metrics.",
      refactoring: ["Increase test coverage", "Decompose large methods", "Reduce external dependencies"]
    };
  }
}
