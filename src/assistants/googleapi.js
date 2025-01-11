import { GoogleGenerativeAI } from "@google/generative-ai";

const googleai = new GoogleGenerativeAI(
    //https://vite.dev/guide/env-and-mode.html
    import.meta.env.VITE_GOOGLE_API_KEYS
);

export class Assistant {
    #chat; //private

    // constructor(){}

    constructor(model = "gemini-1.5-flash-8b") {
        const gemini = googleai.getGenerativeModel({ model }); //du ma no hieu object luon ?
        this.#chat = gemini.startChat({ history: [] });
    }

    async chat(content) {
        try {
            let result = await this.#chat.sendMessage(content);
            return result.response.text();
        } catch (error) {
            throw error;
        }
    }
}