// import { checkForName } from './js/nameChecker'
// import { handleSubmit } from './js/formHandler'

import './styles/main.scss';

// APP JS Code to import later

// Declare variables
const form = document.getElementById('form');
const textarea = document.getElementById('textarea');


/* Report Elements */
const scoreField = document.getElementById('score');
const confidenceField = document.getElementById('confidence');
const agreementField = document.getElementById('agreement');
const ironyField = document.getElementById('irony');
const textField = document.getElementById('user-text');

https: //api.meaningcloud.com/sentiment-2.1?key=4bc67942ac684cd7207449ec3db65c82&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en

  form.addEventListener('submit', performAction);

function performAction(e) {
  e.preventDefault();

  const userText = textarea.value;

  getTextData(userText)

  // .then(() => updateUI());
}

// Fetch text data from API

const getTextData = async (userText) => {

  try {
    const res = await fetch(`http://localhost:8081/analyse/${userText}`);
    const data = await res.json();
    console.log(data);
    updateUI(data, userText);

  } catch (error) {
    console.log(`Something went very wrong: ${error}`);
  }
}

function updateUI(data, userText) {

  let score = data.score_tag;
  let confidence = data.confidence;
  let agreement = data.agreement;
  let irony = data.irony;

  switch (score) {
    case 'P+':
      score = 'Very positive sentiment';
      break;
    case 'P':
      score = 'Positive sentiment';
      break;
    case 'NEU':
      score = 'Neutral sentiment';
      break;
    case 'N':
      score = 'Negative sentiment';
      break;
    case 'N+':
      score = 'Very negative sentiment';
      break;
    case 'NONE':
      score = 'This text has no sentiment';
      break;
  }

  switch (agreement) {
    case 'AGREEMENT':
      agreement = 'There is agreement between the elements polarity';
      break;
    case 'DISAGREEMENT':
      agreement = 'There is no agreement between the elements polarity';
      break;
  }

  switch (irony) {
    case 'IRONIC':
      irony = 'Ironic: The text has ironic marks';
      break;
    case 'NONIRONIC':
      irony = 'Non-ironic: The text does not have ironic marks';
      break;
  }

  // Update UI elements with the allData object
  scoreField.innerHTML = score;
  confidenceField.innerHTML = confidence;
  agreementField.innerHTML = agreement;
  ironyField.innerHTML = irony;
  textField.innerHTML = userText;
}


// const getTextData = async (baseURL, key, userText, model, language) => {

//   try {
//     const res = await fetch(`${baseURL}?key=${key}&of=json&txt=${userText}.&model=${model}&lang=${language}`);
//     const data = await res.json();
//     console.log(data);
//     return data;

//   } catch (error) {
//     console.log(`Something went wrong: ${error}`);
//   }
// }

//Send received data to server
// const postData = async (url = '', data = {}) => {

//   const response = await fetch(url, {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     // Body data type must match "Content-Type" header        
//     body: JSON.stringify(data)
//   });

//   try {
//     const newData = await response.json();
//     console.log(newData);
//     return newData;
//   } catch (error) {
//     console.log("error", error);
//   }
// }

/* Get the project data and update the UI */
// function updateUI(data) {

//   // const request = await fetch('http://localhost:8081/all');

//   try {
//     const allData = await request.json();

//     console.log(allData);

//     let score = allData[0].score;
//     let confidence = allData[0].confidence;
//     let agreement = allData[0].agreement;
//     let irony = allData[0].irony;
//     const sentText = allData[0].text;

//     switch (score) {
//       case 'P+':
//         score = 'Very positive sentiment';
//         break;
//       case 'P':
//         score = 'Positive sentiment';
//         break;
//       case 'NEU':
//         score = 'Neutral sentiment';
//         break;
//       case 'N':
//         score = 'Negative sentiment';
//         break;
//       case 'N+':
//         score = 'Very negative sentiment';
//         break;
//       case 'NONE':
//         score = 'This text has no sentiment';
//         break;
//     }

//     switch (agreement) {
//       case 'AGREEMENT':
//         agreement = 'There is agreement between the elements polarity';
//         break;
//       case 'DISAGREEMENT':
//         agreement = 'There is no agreement between the elements polarity';
//         break;
//     }

//     switch (irony) {
//       case 'IRONIC':
//         irony = 'Ironic: The text has ironic marks';
//         break;
//       case 'NONIRONIC':
//         irony = 'Non-ironic: The text does not have ironic marks';
//         break;
//     }

//     // Update UI elements with the allData object
//     scoreField.innerHTML = score;
//     confidenceField.innerHTML = confidence;
//     agreementField.innerHTML = agreement;
//     ironyField.innerHTML = irony;
//     textField.innerHTML = sentText;

//   } catch (error) {
//     console.log('error', error);
//   }
// }