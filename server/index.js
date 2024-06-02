const cors = require("cors");
const path = require("path");
const express = require("express");
const dataRouter = require("./routes/fetchData")

const {connectMongdb} = require("./connection");

require('dotenv').config();

const PORT = process.env.PORT || 8000;
const app = express();

// connect mongodb
connectMongdb()
.then(()=>console.log("database connected"));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/',dataRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
