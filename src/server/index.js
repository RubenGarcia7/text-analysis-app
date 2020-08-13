var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
const appData = {}
entry = 0;

const PORT = process.env.PORT || 8080

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
    console.log(`App working and listening on ${PORT}, and your API key is ${process.env.API_KEY}`)
})

app.get('/test', function (req, res) {
    res.send('Hello')
})

//Post route
app.post('/sendInfo', addInfo)

function addInfo(req, res) {
    console.log(req.body)
    const data = req.body

    newEntry = {
        agreement: data.agreement,
        confidence: data.confidence,
        irony: data.irony,
        score: data.score,
        text: data.text
    }

    appData[entry] = newEntry;

    res.send({
        message: "POST request is successful"
    })
}

// Initialize all route with a callback function
app.get('/all', sendAppData)

// Callback function to complete GET '/all'
function sendAppData(req, res) {
    res.send(appData)
}