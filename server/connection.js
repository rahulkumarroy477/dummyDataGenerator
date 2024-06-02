const mongoose = require("mongoose");

async function connectMongdb(){
    return mongoose.connect(process.env.MONGO_URL);
}

module.exports = {connectMongdb,};
