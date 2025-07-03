import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

@Injectable({
  providedIn: 'root',
})
export class Gemini {

  // IMPORTANT: In a real application, fetch the API key securely (e.g., from a backend)
  // For development, you can use environment variables.
  genAI = new GoogleGenerativeAI(environment.geminiApiKey);
  model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-pro' }); // Or 'gemini-2.0-flash', etc.

  async generateContent(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating content from Gemini:', error);
      throw error;
    }
  }

  async startChat(): Promise<any> {
    const chat = this.model.startChat({
      history: [
        // Optional: You can pre-populate chat history
      ],
    });
    return chat;
  }


  async generateContentWithFile(prompt: string, file: any) {
    const ai = new GoogleGenAI({ apiKey: environment.geminiApiKey });
    const myfile = await ai.files.upload({
      file: file,
      config: { mimeType: file.type },
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri(myfile.uri!, myfile.mimeType!),
        prompt,
      ]),
    });
    console.log(response.text);
    return response.text;
  }


}