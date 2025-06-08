

const axios = require("axios");
const { cmd } = require("../command");

cmd({//
    pattern: "gpt",
    alias: "ai",
    desc: "Interact with ChatGPT using the Dreaded API.",
    category: "ai",
    react: "🤖",
    use: "<your query>",
    filename: __filename,
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        // Vérification de l'entrée utilisateur
        if (!q) return reply("*⚠️ Please provide a query for ChatGPT.*\n\n*Example:*\n*.gpt What is AI?*");

        // Utilisation de `${text}` dans le endpoint API
        const text = q;  // Texte de la requête de l'utilisateur
        const encodedText = encodeURIComponent(text);  // S'assurer que le texte est encodé correctement

        const url = `https://api.dreaded.site/api/chatgpt?text=${encodedText}`;

        console.log('Requesting URL:', url);  // Afficher l'URL pour vérifier

        // Appel à l'API avec headers personnalisés (ajoute des headers si nécessaire)
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',  // Ajouter un User-Agent pour simuler une requête valide
                'Accept': 'application/json',  // Spécifier que l'on attend une réponse JSON
            }
        });

        // Déboguer et afficher la réponse complète
        console.log('Full API Response:', response.data);

        // Vérification de la structure de la réponse
        if (!response || !response.data || !response.data.result) {
            return reply("❌ No response received from the GPT API. Please try again later.");
        }

        // Extraire uniquement le texte de la réponse (le prompt)
        const gptResponse = response.data.result.prompt;

        if (!gptResponse) {
            return reply("❌ The API returned an unexpected format. Please try again later.");
        }

        // Image AI à envoyer
        const ALIVE_IMG = 'https://static.beebom.com/wp-content/uploads/2024/10/jjk-poster.jpg'; // Remplacez par l'URL de votre image AI

        // Légende avec des informations formatées
        const formattedInfo = `*🤖 ᴄʜᴀᴛ.ɢᴘᴛ ʀᴇsᴘᴏɴsᴇ:*\n\n${gptResponse}`;

        // Envoyer le message avec image et légende
        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG }, // Assurez-vous que l'URL est valide
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: '𝕳𝖚𝖘𝖘𝖆𝖎𝖓 𝙼ԃ⎯꯭̽💀  𝐀𝐈 🤖',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in GPT command:", error);

        // Affichage du message d'erreur dans la console pour plus de détails
        if (error.response) {
            console.log("Error Response Data:", error.response.data);
        } else {
            console.log("Error Details:", error.message);
        }

        // Répondre avec des détails de l'erreur
        const errorMessage = `
❌ An error occurred while processing the GPT command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});
cmd({
    pattern: "llama3",
    desc: "Get a response from Llama3 AI using the provided prompt.",
    category: "ai",
    react: "🤖",
    filename: __filename,
    use: ".llama3 <your prompt>"
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        // Check if a prompt is provided by the user
        if (!q) return reply("⚠️ Please provide a prompt for Llama3 AI.");

        // Inform the user that the request is being processed
        await reply("> *Processing your prompt...*");

        // API URL with encoded user prompt
        const apiUrl = `https://api.davidcyriltech.my.id/ai/llama3?text=${encodeURIComponent(q)}`;

        // Send a GET request to the API
        const response = await axios.get(apiUrl);
        console.log("Llama3 API Response:", response.data);

        // Extract AI response
        let llamaResponse;
        if (typeof response.data === "string") {
            llamaResponse = response.data.trim();
        } else if (typeof response.data === "object") {
            llamaResponse = response.data.response || response.data.result || JSON.stringify(response.data);
        } else {
            llamaResponse = "Unable to process the AI response.";
        }

        // AI image to attach
        const AI_IMG = 'https://static.beebom.com/wp-content/uploads/2024/10/jjk-poster.jpg'; // Replace with a valid image URL

        // Formatted response text
        const formattedInfo = `*🤖 ʟʟᴀᴍᴀ3 ʀᴇsᴘᴏɴsᴇ:*\n\n${llamaResponse}`;

        // Send the response with an image
        await conn.sendMessage(from, {
            image: { url: AI_IMG }, // Ensure the URL is valid
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: ' 🤖',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in llama3 command:", error);
        return reply(`❌ An error occurred: ${error.message}`);
    }
});
cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for OpenAI.\nExample: `.openai Hello`");

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("OpenAI failed to respond. Please try again later.");
        }

        await reply(`🧠 *OpenAI Response:*\n\n${data.result}`);
        await react("✅");
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await react("❌");
        reply("An error occurred while communicating with OpenAI.");
    }
});

cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for DeepSeek AI.\nExample: `.deepseek Hello`");

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply("DeepSeek AI failed to respond. Please try again later.");
        }

        await reply(`🧠 *DeepSeek AI Response:*\n\n${data.answer}`);
        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with DeepSeek AI.");
    }
});
