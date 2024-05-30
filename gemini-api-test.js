const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require('dotenv').config();

let dummy_data = [];

async function run(num_rows) {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        throw new Error("Missing API_KEY in .env file");
    }
    console.log(apiKey);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate ${num_rows} rows of JSON data with attributes: id, name, email`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // console.log(text);
    const cleaned_text = text.replace(/`/g, '').replace('json', '').trim();
    const data = JSON.parse(cleaned_text);

    data.forEach(element => {
        dummy_data.push(element);
    });
    // console.log(data);
    fs.writeFile("dummy-data.json",JSON.stringify(dummy_data, null, 2),(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("file written successfully");
        }
    });
}

run(20);