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
        this.#chat = gemini.startChat({
            history: [
                {
                    role: "user",
                    parts: [
                        { text: "Hello, my name is Long" },
                    ],
                },
                {
                    role: "user",
                    parts: [
                        { text: "I am 20 years old" }
                    ]
                },
                {
                    role: "user",
                    parts: [
                        { text: "My main programming language is Java" }
                    ]
                },
                {
                    role: "user",
                    parts: [
                        { text: "I like `mắm ruốc` the food comes from vietnam" }
                    ]
                }
            ]
        });
    }

    async chat(content) {
        try {
            let result = await this.#chat.sendMessage(content);
            return result.response.text();
        } catch (error) {
            throw error;
        }
    }

    async *chatStream(content) {
        try {
            let result = await this.#chat.sendMessageStream(content);
            for await (const chunk of result.stream) {
                yield chunk.text();
            }
        } catch (error) {
            throw error;
        }
    }
}
