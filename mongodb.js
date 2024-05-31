const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema.js");
const data = require("./jsonData/data1.json");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const MONGOURL = process.env.MONGO_URL;
async function getUsers(count){
  const users = await User.find().limit(count);
  console.log(users);
}

async function addData() {
  try {
    await Promise.all(data.map(async (person) => {
      let id = person.id;
      let first_name = person.first_name;
      let last_name = person.last_name;
      let email = person.email;
      let gender = person.gender;
      let ip_address = person.ip_address;
      let mac_address = person.mac_address;
      let address = person.address;
      let birthdate = person.birthdate;
      let phone = person.phone;
      let job_title = person.job_title;
      let nationality = person.nationality;
      let city = person.city;
      let language = person.language;
      let company_name = person.company_name;
      const newUser = new User({
        id, first_name, last_name, email, gender, ip_address, mac_address, address, birthdate, phone,
        job_title, nationality, city, language, company_name
      });
      await newUser.save();
    }));
    console.log("Data added successfully");
  } catch (error) {
    console.log("Error while adding data:", error);
  }
}


async function startServer() {
  try {
    // await addData(); // Wait for data addition to complete
    getUsers(10);
    app.listen(PORT, () => console.log(`Server connected on ${PORT}`));
  } catch (error) {
    console.log("Error while adding data:", error);
  }
}

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("Database connected");
    startServer();
  }).catch(err => console.log(err));