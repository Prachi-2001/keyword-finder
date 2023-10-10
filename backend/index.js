// Import the express library
const express = require('express')
const axios = require('axios');
const cors = require('cors')
const port = 5000
const dotenv = require('dotenv');

// Create a new express application
const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true
}));

// app.use(cors(corsOptions));

// Send a "Hello World!" response to a default get request
app.get('/', (req, res) => {
    res.send('Hello, world!')
})

// Send a JSON response to a default get request
app.get('/results', async (req, res) => {
    const keywords = req.query.keywords
    const limit = req.query.limit

    console.log(keywords)

    const requestOptions = {
        'method': 'GET',
        'params': {keywords: `${keywords}`},
        'url': `https://api.etsy.com/v3/application/listings/active?${limit}`, 
        'headers': {
            'x-api-key':  process.env.ETSY_API_KEY,
        },
    };

    axios.request(requestOptions).then((response) => {
        res.json(response.data)
    }).catch((error) => console.log(error))
});

// Start the server on port 3003

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})