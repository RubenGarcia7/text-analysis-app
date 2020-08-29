var path = require('path')
const express = require('express')
const fetch = require('node-fetch')

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8081

//Set up environment variables

const app = express()

/* Main Directory */
app.use(express.static('dist'))

/* Index Route */
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware */
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Designates what port the app will listen to for incoming requests
app.listen(PORT, function (err) {
    if (err) {
        console.log('there was a problem', err)
        return
    }
    console.log(`App working and listening on ${PORT}`)
})

/* Test Route */
app.get('/test', function (req, res) {
    res.send('Hello')
})

// API Variables
const key = process.env.API_KEY;
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const model = 'general';
const language = 'en';

/* API Get Call Route */
app.get('/analyse/:text', (req, res) => {
    const userText = req.params.text;
    console.log(userText)
    fetch(`${baseURL}?key=${key}&of=json&txt=${userText}.&model=${model}&lang=${language}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        res.send(data)
    })
    .catch(err => {
        console.log(err);
    })
})