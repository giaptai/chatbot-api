import OpenAI from "openai";

const openai = new OpenAI({
    organization: 'org-bV02122kLZEpiscMSlhr3g1B',
    project: 'proj_hIh1l8rdcC8DBBYUtC3GQRsN',
    store: true,
    apiKey: import.meta.env.VITE_OPENAI_API_KEYS,
    dangerouslyAllowBrowser: true
});

export class Assistant {
    #model; // private

    constructor(model = "gpt-4o-mini") {
        this.#model = model;
    }

    async chat(content, history) {
        try {
            let result = await openai.chat.completions.create({
                model: this.#model,
                messages: [...history, { content, role: "user" }],
            });
            return result.choices[0].message.content;
        } catch (error) {
            throw error;
        }
    }
}
