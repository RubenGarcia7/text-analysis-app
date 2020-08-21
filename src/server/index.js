var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch')

const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
const appData = {}
entry = 0;

const PORT = process.env.PORT || 8081

//Set up environment variables

const app = express()

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// designates what port the app will listen to for incoming requests
app.listen(PORT, function (err) {
    if (err) {
        console.log('there was a problem', err)
        return
    }
    console.log(`App working and listening on ${PORT}`)
})

app.get('/test', function (req, res) {
    res.send('Hello')
})

//Post route
// app.post('/sendInfo', addInfo)

// function addInfo(req, res) {
//     console.log(req.body)
//     const data = req.body

//     newEntry = {
//         agreement: data.agreement,
//         confidence: data.confidence,
//         irony: data.irony,
//         score: data.score,
//         text: data.text
//     }

//     appData[entry] = newEntry;

//     res.send({
//         message: "POST request is successful"
//     })
// }

// Initialize all route with a callback function
// app.get('/all', sendAppData)

// // Callback function to complete GET '/all'
// function sendAppData(req, res) {
//     res.send(appData)
// }

// Variables
const key = process.env.API_KEY;
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const model = 'general';
const language = 'en';

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