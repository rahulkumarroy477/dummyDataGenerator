const express = require("express");
const fs = require('fs');
const cors = require("cors");
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

let dummy_data = require("./dummy-data.json");
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint to handle custom data
app.post('/customData', async (req, res) => {
  const body = req.body;
  console.table(body);

  return res.status(201).json({
    status: "Data added",
    receivedData: body
  });
});

// Endpoint to handle AI data
app.post('/aiData', async (req, res) => {
  const body = req.body;
  console.table(body);
  const params = body.map((elem) => elem.fieldName);
  console.log(params);
  
  try {
    const jsonData = await run(10, params); // Assuming num_rows is 10 for example
    return res.status(201).json({
      status: "Data added",
      receivedData: jsonData
    });
  } catch (error) {
    console.error('Error generating AI data:', error);
    return res.status(500).json({
      status: "Error",
      message: error.message
    });
  }
});

async function run(num_rows,params) {
  const apiKey = process.env.API_KEY;
  const fieldnames = params.join(", ");
  if (!apiKey) {
      throw new Error("Missing API_KEY in .env file");
  }
  console.log(apiKey);

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate ${num_rows} rows of JSON data with attributes: ${params}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // console.log(text);
  const cleaned_text = text.replace(/`/g, '').replace('json', '').trim();
  const data = JSON.parse(cleaned_text);

  data.forEach(element => {
      dummy_data.push(element);
  });
  console.log(data);
  fs.writeFile("dummy-data.json",JSON.stringify(dummy_data, null, 2),(err,data)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log("file written successfully");
      }
  });

  return dummy_data
}

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
