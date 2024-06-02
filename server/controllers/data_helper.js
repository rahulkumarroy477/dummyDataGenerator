const User = require("../models/schema");

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateData(params) {
    const apiKey = process.env.API_KEY;
    let dummy_data = [];
    if (!apiKey) {
        throw new Error("Missing API_KEY in .env file");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate 10 rows of JSON data with attributes: ${params}`;
    for (let i = 0; i < 5; i++) {
        try {
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            try {
                const cleanedText = text.replace(/`/g, '').replace('json', '').trim();
                const data = JSON.parse(cleanedText);

                dummy_data = dummy_data.concat(data);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                continue;
            }
            console.log(`API call ${i + 1} completed`);

        } catch (error) {
            console.error("Error generating content:", error);
        }
    }

    dummy_data = dummy_data.map((row, index) => {
        row.id = index + 1;
        return row;
    });

    return dummy_data;
}

async function getUsers(count, fields) {
    try {
        const users = await User.find({}, { _id: 0 }).limit(count).select(fields);
        return users;
    } catch (error) {
        console.error("Error retrieving users:", error);
        throw error;
    }
}

module.exports = {
    generateData,
    getUsers,
}