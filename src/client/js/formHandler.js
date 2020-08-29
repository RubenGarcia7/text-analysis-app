/* UI Elements */
const scoreField = document.getElementById('score');
const confidenceField = document.getElementById('confidence');
const agreementField = document.getElementById('agreement');
const ironyField = document.getElementById('irony');

/* Function triggered when submitting the form */
export function performAction(event) {
  event.preventDefault();

  const userText = textarea.value;

  // Validate the user input
  Client.formValidator(userText);

  // Fetch the data
  getTextData(userText);
}

// Fetch text data from API
export const getTextData = async (userText) => {

  try {
    const res = await fetch(`/analyse/${userText}`);
    const data = await res.json();
    console.log(data);

    // Update UI
    updateUI(data, userText);

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}

export function updateUI(data, userText) {

  // Define variables from the API response
  let score = data.score_tag;
  let confidence = data.confidence;
  let agreement = data.agreement;
  let irony = data.irony;

  // Assign different string values depending on the response
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

  // Update UI elements with the correct message
  scoreField.innerHTML = score;
  confidenceField.innerHTML = confidence;
  agreementField.innerHTML = agreement;
  ironyField.innerHTML = irony;
}
