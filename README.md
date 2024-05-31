Certainly! Here's a sample GitHub README for your dummy data generator project:
# Live
https://dummydatagenerator.onrender.com/
---

# Dummy Data Generator

Welcome to the Dummy Data Generator! This project is designed to help developers quickly generate realistic dummy data for testing and development purposes. It's built with Node.js and Express for the backend and uses MongoDB as the database. For AI-generated data, we integrate with the Gemini API, providing a limited set of up to 50 entries.

## Features

- **Customizable Data Generation**: Easily generate various types of dummy data tailored to your needs.
- **MongoDB Integration**: Retrieve data with MongoDB.
- **AI-Generated Data**: Used Gemini API to generate AI-created data entries (limited to 50 entries).
- **RESTful API**: Access and manage your dummy data through a simple RESTful API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/rahulkumarroy477/dummyDataGenerator.git
    cd dummyDataGenerator
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=8000
    MONGO_URl=your-mongodb-uri
    API_KEY=your-gemini-api-key
    ```

4. **Start the server:**
    ```sh
    npm start
    ```

## Usage

Once the server is running, you can start making requests to the API to generate and manage your dummy data.

### Generating Data

To generate dummy data, send a POST request to `/generate` with the desired parameters. 

Example:
```sh
curl -X GET https://dummydatagenerator.onrender.com/ -H {"Content-Type: application/json",
"rows":rows,"fieldNames":fieldname}
```

### Fetching Data

Retrieve the generated data with a GET request to `/data`.

Example:
```sh
curl https://dummydatagenerator.onrender.com/customData
curl https://dummydatagenerator.onrender.com/aiData
```

## API Endpoints



### GET /data

Fetches all generated data.

- **Response:**
  - A JSON array of all generated data entries.


## Configuration

You can configure the application using environment variables:

- `PORT`: The port on which the server will run (default: 3000).
- `MONGODB_URI`: The MongoDB connection URI.
- `GEMINI_API_KEY`: Your API key for the Gemini AI service.

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests for any features or bug fixes. Follow the code style and conventions used in the project.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License


---

Feel free to adjust any sections to better fit your project's specifics. If you need more detailed instructions or additional sections, let me know!
