const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./schema.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 8000;

const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("Database connected");
  }).catch(err => console.log(err));

let dummy_data = [];

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON payloads


app.get('/customData', async (req, res) => {
  const header = req.headers;
  let data = header.data;   // string
  console.log(data);
  data = data.split(",");
  const users = await getUsers(10);
  return res.status(201).json({
    receivedData: users,
    status: "Data added",
  });
});

app.get('/aiData', async (req, res) => {
  const header = req.headers;
  const data = header.data; // Expecting a JSON string in the 'data' header

  console.log("Received data:", data);
  try {
    await generateData(data);
    return res.status(201).json({
      status: "Data added",
      receivedData: dummy_data
    });
  } catch (error) {
    console.error('Error generating AI data:', error);
    return res.status(500).json({
      status: "Error",
      message: error.message
    });
  }
});


async function generateData(params) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Missing API_KEY in .env file");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate 10 rows of JSON data with attributes: ${params}`;
  for (let i = 0; i < 5; i++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      const cleanedText = text.replace(/`/g, '').replace('json', '').trim();
      const data = JSON.parse(cleanedText);

      // Add the generated data to the dummy_data array
      dummy_data = dummy_data.concat(data);

      // Log the generated data
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

}
async function getUsers(count){
  const users = await User.find().limit(count);
  console.log(users);
  return users;
}
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
