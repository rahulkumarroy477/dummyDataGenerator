const { generateData, getUsers, } = require("./data_helper");
const path = require("path");

async function handleCustomData(req, res) {
    const headers = req.headers;
    const row = headers.row;
    let data = headers.data; // string

    console.log(row, data);

    if (!data) {
        return res.status(400).json({
            status: "Error",
            message: "Missing 'data' in headers"
        });
    }

    data = data.split(',').join(' '); // get the attribute names

    try {
        const users = await getUsers(row, data);
        console.log(users);
        return res.status(200).json({
            receivedData: users,
            status: "Data retrieved",
        });
    } catch (error) {
        console.error('Error retrieving custom data:', error);
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
}

async function handleAiData(req, res) {
    const headers = req.headers;
    const data = headers.data;

    console.log("Received data:", data);

    // Ensure data is provided
    if (!data) {
        return res.status(400).json({
            status: "Error",
            message: "Missing 'data' in headers"
        });
    }

    try {
        const ai_data = await generateData(data);
        return res.status(200).json({
            status: "Data generated",
            receivedData: ai_data
        });
    } catch (error) {
        console.error('Error generating AI data:', error);
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
}

function handleHomePage(req, res) {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
}



module.exports = {
    handleHomePage,
    handleCustomData,
    handleAiData,
}

